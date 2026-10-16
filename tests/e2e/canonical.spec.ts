import { expect, test } from "@playwright/test";

const origin = "https://www.treydmarktech.com";
for (const [path, canonical] of [["/", origin], ["/projects", `${origin}/projects`]]) {
  test(`${path} renders one production canonical in HTML and DOM`, async ({ page, request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const links = html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) ?? [];
    expect(links).toHaveLength(1);
    expect(links[0]).toContain(`href="${canonical}"`);
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
  });
}

test("client navigation updates canonical without inheriting the homepage URL", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href="/projects"]').first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/projects`);
  await page.goBack();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", origin);
});

test("sitemap agrees with page canonicals and missing routes do not inherit one", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const locations = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations).toEqual([origin, `${origin}/projects`]);
  const missing = await request.get("/canonical-regression-missing");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).not.toMatch(/<link\b[^>]*rel="canonical"/);
});

test.beforeEach(async ({ page }) => {
  // Metadata checks never load or interact with third-party portfolio documents.
  await page.route(/https:\/\/(?:www\.)?(?:luxerealtyphotography|sellwithcaseyjames|jorgepenskytennisacademy|thebrassanovas|heartofthematterschoolofmusic|hondoshandyman)\.com\/.*/, route => route.fulfill({ contentType: "text/html", body: "<html><body>Preview fixture</body></html>" }));
});
