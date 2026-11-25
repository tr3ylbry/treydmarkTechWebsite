import { expect, test } from "@playwright/test";

const fields = ["service", "budget", "timeline"] as const;

test.beforeEach(async ({ page }) => {
  // Never load client previews or send an inquiry during dropdown checks.
  await page.route("**/*", (route) => {
    const request = route.request();
    if (request.url().includes("/api/inquiry")) return route.abort();
    if (request.isNavigationRequest() && request.frame().parentFrame()) {
      return route.fulfill({ contentType: "text/html", body: "<p>Preview fixture</p>" });
    }
    return route.continue();
  });
  await page.goto("/");
});

for (const [index, field] of fields.entries()) {
  test(`${field}: keyboard commits, cancels, scrolls and leaves focus usable`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const trigger = page.locator(`#${field}-trigger`);
    const value = page.locator(`input[name="${field}"]`);
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    const listbox = page.getByRole("listbox");
    const options = listbox.getByRole("option");
    const second = await options.nth(1).innerText();
    await page.keyboard.press("ArrowDown");
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-activedescendant", (await options.nth(1).getAttribute("id"))!);
    await expect(value).toHaveValue("");
    await page.keyboard.press("Enter");
    await expect(value).toHaveValue(second);
    await expect(trigger).toContainText(second);
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).not.toHaveAttribute("aria-activedescendant");

    await page.keyboard.press("Enter");
    await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    const lastId = (await options.last().getAttribute("id"))!;
    await expect(trigger).toHaveAttribute("aria-activedescendant", lastId);
    await page.keyboard.press("ArrowDown");
    await expect(trigger).toHaveAttribute("aria-activedescendant", lastId);
    await expect.poll(() => options.last().evaluate((option) => {
      const item = option.getBoundingClientRect();
      const panel = option.parentElement!.getBoundingClientRect();
      return item.top >= panel.top && item.bottom <= panel.bottom && item.bottom <= innerHeight;
    })).toBe(true);
    if (field === "service") await page.screenshot({ path: testInfo.outputPath("active-option-mobile.png") });
    await page.keyboard.press("Escape");
    await expect(value).toHaveValue(second);
    await expect(trigger).toBeFocused();
    await expect(listbox).toHaveCount(0);

    await page.keyboard.press("Space");
    await page.keyboard.press("Home");
    const first = await options.first().innerText();
    const firstId = (await options.first().getAttribute("id"))!;
    await page.keyboard.press("ArrowUp");
    await expect(trigger).toHaveAttribute("aria-activedescendant", firstId);
    await page.keyboard.press("Space");
    await expect(value).toHaveValue(first);
    await page.keyboard.press("ArrowUp");
    await expect(trigger).toHaveAttribute("aria-activedescendant", firstId);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Tab");
    await expect(listbox).toHaveCount(0);
    await expect(value).toHaveValue(first);
    const next = index < 2 ? page.locator(`#${fields[index + 1]}-trigger`) : page.getByLabel("Project Details");
    await expect(next).toBeFocused();
  });
}

for (const width of [320, 375, 768, 1440]) {
  test(`${width}px: pointer choices and dropdown placement remain usable`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 812 });
    for (const field of fields) {
      const trigger = page.locator(`#${field}-trigger`);
      await trigger.click();
      const listbox = page.getByRole("listbox");
      const bounds = await listbox.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(812);
      const option = listbox.getByRole("option").first();
      const text = await option.innerText();
      if (field === "service" && width === 1440) await page.screenshot({ path: testInfo.outputPath("dropdown-desktop.png") });
      await option.click();
      await expect(page.locator(`input[name="${field}"]`)).toHaveValue(text);
      await expect(trigger).toContainText(text);
      await expect(listbox).toHaveCount(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("emulated touch still chooses every required dropdown", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 375, height: 812 }, hasTouch: true });
  const page = await context.newPage();
  await page.route("**/*", (route) => {
    const request = route.request();
    if (request.url().includes("/api/inquiry")) return route.abort();
    if (request.isNavigationRequest() && request.frame().parentFrame()) return route.fulfill({ contentType: "text/html", body: "Preview fixture" });
    return route.continue();
  });
  await page.goto("/");
  for (const field of fields) {
    await page.locator(`#${field}-trigger`).tap();
    const option = page.getByRole("option").first();
    const text = await option.innerText();
    await option.tap();
    await expect(page.locator(`input[name="${field}"]`)).toHaveValue(text);
  }
  await context.close();
});
