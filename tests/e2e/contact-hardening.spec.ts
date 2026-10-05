import { expect, test, type Page } from '@playwright/test';

async function fillInquiry(page: Page) {
  await page.getByLabel('Name', { exact: true }).fill('Synthetic Visitor');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.test');
  await page.getByLabel('Project Details').fill('Please help us improve our business website.');
  for (const [label, value] of [['Service Interested In', 'Starter Site'], ['Budget Range', 'Not sure yet'], ['Timeline', 'Flexible']]) {
    await page.getByRole('combobox', { name: label }).click();
    await page.getByRole('option', { name: value, exact: true }).click();
  }
}

test.beforeEach(async ({ page }) => {
  // Keep this suite local and synthetic; never use the real provider.
  await page.route(/https:\/\/(luxerealtyphotography|sellwithcaseyjames|jorgepenskytennisacademy)\.com\/.*/, route => route.fulfill({ contentType: 'text/html', body: '<html><body>Preview fixture</body></html>' }));
  await page.goto('/');
});

test('validation stays quiet initially, focuses invalid field, and hides honeypot accessibly', async ({ page }) => {
  const form = page.locator('#contact form');
  await expect(form.getByText('This field is required.', { exact: true })).toHaveCount(0);
  await expect(form.locator('[name="companyWebsite"]')).toBeHidden();
  await expect(form.locator('[name="companyWebsite"]')).toHaveAttribute('tabindex', '-1');
  await form.getByRole('button', { name: 'Send Inquiry' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
  await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('aria-describedby', 'email-error');
});

test('accepted mock sends empty honeypot, prevents duplicates, and resets only after acceptance', async ({ page }) => {
  let calls = 0;
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/api/inquiry', async route => {
    calls++;
    expect(route.request().postDataJSON()).toMatchObject({ companyWebsite: '', name: 'Synthetic Visitor', phone: '' });
    await pending;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, code: 'accepted' }) });
  });
  await fillInquiry(page);
  await page.getByRole('button', { name: 'Send Inquiry' }).click();
  await expect(page.locator('#contact form')).toHaveAttribute('aria-busy', 'true');
  await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  await expect.poll(() => calls).toBe(1);
  release();
  const status = page.locator('#contact [role="status"]');
  await expect(status).toContainText('Inquiry accepted for sending.');
  await expect(status).toBeFocused();
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('');
  await expect(page.getByRole('combobox', { name: 'Budget Range' })).toContainText('Select an option');
});

for (const failure of [{ status: 429, body: { error: 'Too many attempts. Please wait a few minutes before trying again.' } }, { status: 502, body: { error: 'private RESEND_API_KEY detail' } }, { status: 200, body: { success: true } }]) {
  test(`failure ${failure.status}/${JSON.stringify(failure.body)} preserves inquiry and announces safely`, async ({ page }) => {
    await page.route('**/api/inquiry', route => route.fulfill({ status: failure.status, contentType: 'application/json', body: JSON.stringify(failure.body) }));
    await fillInquiry(page);
    await page.getByRole('button', { name: 'Send Inquiry' }).click();
    const alert = page.locator('#contact [role="alert"]');
    await expect(alert).not.toBeEmpty();
    await expect(alert).toBeFocused();
    await expect(alert).not.toContainText('private');
    await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Synthetic Visitor');
    await expect(page.getByRole('combobox', { name: 'Budget Range' })).toContainText('Not sure yet');
    await expect(page.getByRole('button', { name: 'Send Inquiry' })).toBeEnabled();
    await expect(page.locator('#contact form')).toHaveAttribute('aria-busy', 'false');
  });
}

test('actual Next route rejects foreign origins and invalid shapes before delivery', async ({ request }) => {
  const foreign = await request.post('/api/inquiry', { headers: { origin: 'https://foreign.test' }, data: {} });
  expect(foreign.status()).toBe(403);
  const invalid = await request.post('/api/inquiry', { headers: { origin: 'http://localhost:3106' }, data: { name: [] } });
  expect(invalid.status()).toBe(400);
  expect(invalid.headers()['cache-control']).toBe('no-store');
});
