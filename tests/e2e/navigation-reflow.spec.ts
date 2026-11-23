import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Navigation-only checks: do not load or interact with client-site embeds.
  await page.route("**/*", (route) => {
    const request = route.request();
    if (request.isNavigationRequest() && request.frame().parentFrame()) {
      return route.fulfill({ contentType: "text/html", body: "<p>Preview fixture</p>" });
    }
    return route.continue();
  });
});

for (const path of ["/", "/projects"]) {
  test(`${path}: short menu supports scrolling, keyboard activation and Escape`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 340, height: 234 });
    await page.goto(path);
    const toggle = page.getByRole("button", { name: /navigation menu/ });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toBeFocused();
    const menu = page.locator("#mobile-navigation-menu");
    const bounds = await menu.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(234);
    expect(await menu.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);

    // Tab through the real links; browser focus must scroll each into view.
    for (const link of await menu.getByRole("link").all()) {
      await page.keyboard.press("Tab");
      // Firefox includes a scrollable region itself in sequential focus order.
      if (await menu.evaluate((element) => element === document.activeElement)) {
        await page.keyboard.press("Tab");
      }
      await expect(link).toBeFocused();
      await expect.poll(() => link.evaluate((element) => {
        const link = element.getBoundingClientRect();
        const panel = element.parentElement!.getBoundingClientRect();
        return {
          name: element.textContent, top: link.top, bottom: link.bottom,
          panelTop: panel.top, panelBottom: panel.bottom, viewport: innerHeight,
          visible: link.top >= panel.top && link.bottom <= panel.bottom && link.bottom <= innerHeight,
        };
      })).toMatchObject({ visible: true });
    }
    await page.screenshot({ path: testInfo.outputPath("short-menu-keyboard.png") });
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await menu.hover();
    await page.mouse.wheel(0, 600);
    await expect.poll(() => menu.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
    await menu.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(menu).toHaveCount(0);

    await toggle.click();
    const start = menu.getByRole("link", { name: "Start a Project", exact: true });
    await start.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(menu).toHaveCount(0);
  });
}

for (const width of [320, 375, 768]) {
  test(`${width}px: menu links remain usable without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.locator("#mobile-navigation-menu").getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/#services$/);
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("desktop navigation remains available without the mobile toggle", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: /navigation menu/ })).toBeHidden();
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
