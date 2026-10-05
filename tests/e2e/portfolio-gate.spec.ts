import { expect, test } from '@playwright/test';

for (const { path, count } of [{ path: '/', count: 2 }, { path: '/projects', count: 6 }]) {
 test.describe(path, () => {
test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.includes('reduced motion')) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  }
  // Exercise local fixtures only: never interact with third-party sites.
  await page.route(/https:\/\/(?:www\.)?(luxerealtyphotography|sellwithcaseyjames|jorgepenskytennisacademy|thebrassanovas|heartofthematterschoolofmusic|hondoshandyman)\.com\/.*/, route => route.fulfill({
    contentType: 'text/html', body: '<html><body style="height:3000px"><button>Fixture control</button></body></html>',
  }));
  await page.goto(path);
});

test('every live preview requires activation, exits and activates repeatedly', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Static mobile fallback');
  const previews = page.locator('[data-live-preview]');
  await expect(previews).toHaveCount(count);
  for (const preview of await previews.all()) {
    const frame = preview.locator('iframe');
    const activate = preview.getByRole('button', { name: /Explore Live Preview/ });
    await expect(frame).toHaveAttribute('inert', '');
    await expect(frame).toHaveAttribute('tabindex', '-1');
    await activate.focus();
    await page.keyboard.press('Enter');
    await expect(frame).not.toHaveAttribute('inert', '');
    const exit = preview.getByRole('button', { name: /Exit preview:/ });
    await expect(exit).toBeFocused();
    await page.keyboard.press('Tab');
    await expect.poll(() => frame.evaluate(element => element.ownerDocument.activeElement === element)).toBe(true);
    // Browsers may include the frame document itself as a tab stop.
    // Traverse back through those stops without assigning focus directly.
    for (let step = 0; step < 3 && !(await exit.evaluate(element => element === element.ownerDocument.activeElement)); step++) {
      await page.keyboard.press('Shift+Tab');
    }
    await expect(exit).toBeFocused();
    await page.keyboard.press('Space');
    await expect(activate).toBeFocused();
    await page.keyboard.press('Space');
    await expect(exit).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(activate).toBeFocused();
    await expect(frame).toHaveAttribute('inert', '');
  }
});

test('inactive preview permits page scrolling and outside interaction resets it', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Static mobile fallback');
  const preview = page.locator('[data-live-preview]').first();
  await preview.scrollIntoViewIfNeeded();
  const bounds = await preview.locator('iframe').boundingBox();
  if (!bounds) throw new Error('Missing preview');
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 150);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  await preview.getByRole('button', { name: /Explore/ }).click();
  await page.locator('main').getByRole('link', { name: 'View Live Site', exact: true }).first().focus();
  await expect(preview).toHaveAttribute('data-active', 'false');
});

test('mobile fallback and external links remain available without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: /Explore Live Preview/ })).toHaveCount(0);
  await expect(page.locator('main').getByRole('img', { name: /mobile website preview/ })).toHaveCount(count);
  await expect(page.locator('main').getByRole('link', { name: 'View Live Site', exact: true }).first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 1280, height: 900 });
  const preview = page.locator('[data-live-preview]').first();
  await preview.getByRole('button', { name: /Explore/ }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(preview).toHaveAttribute('data-active', 'false');
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(preview).toHaveAttribute('data-active', 'false');
});

 test('gate remains usable with reduced motion', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Static mobile fallback');
  const preview = page.locator('[data-live-preview]').first();
  await preview.getByRole('button', { name: /Explore/ }).click();
  await preview.getByRole('button', { name: /Exit preview:/ }).click();
  await expect(preview.getByRole('button', { name: /Explore/ })).toBeFocused();
});

 });
}
