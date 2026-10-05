import { expect, test } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

test('observe real external iframe loads without enabling interaction', async ({ page }) => {
  const failures: { url: string; error: string | null }[] = [];
  const documents: { url: string; status: number; xFrameOptions?: string; contentSecurityPolicy?: string }[] = [];
  await page.route('**/*', async route => {
    // Remote previews may issue analytics or API writes without visitor input.
    // Allow only read requests throughout this diagnostic.
    if (!['GET', 'HEAD'].includes(route.request().method())) await route.abort();
    else await route.continue();
  });
  page.on('requestfailed', request => {
    if (request.isNavigationRequest()) failures.push({ url: request.url(), error: request.failure()?.errorText ?? null });
  });
  page.on('response', response => {
    if (response.request().isNavigationRequest()) documents.push({ url: response.url(), status: response.status(), xFrameOptions: response.headers()['x-frame-options'], contentSecurityPolicy: response.headers()['content-security-policy'] });
  });
  await page.goto('/projects');
  const frames = page.locator('[data-live-preview] iframe');
  await expect(frames).toHaveCount(6);
  const observations = [];
  for (const iframe of await frames.all()) {
    await iframe.scrollIntoViewIfNeeded();
    const element = await iframe.elementHandle();
    const frame = await element?.contentFrame();
    let loaded = false;
    let error: string | null = null;
    try {
      await frame?.waitForURL(url => url.href !== 'about:blank', { timeout: 15_000 });
      await frame?.waitForLoadState('domcontentloaded', { timeout: 15_000 });
      loaded = !!frame?.url().startsWith('https://');
      if (!loaded) error = 'Browser rendered an error document; inspect navigation failures and response embedding policies.';
    } catch (failure) { error = String(failure); }
    observations.push({ title: await iframe.getAttribute('title'), src: await iframe.getAttribute('src'), observedUrl: frame?.url(), loaded, error });
    await expect(iframe).toHaveAttribute('inert', '');
  }
  const evidence = { observations, documents, failures, interactionsEnabled: false, nonReadRequestsBlocked: true };
  await writeFile('../external-frame-load-results.json', JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify(observations));
});
