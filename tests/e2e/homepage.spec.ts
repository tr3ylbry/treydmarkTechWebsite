import { expect, test } from "@playwright/test";

test("renders the homepage pricing and contact sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Treydmark Tech/);
  await expect(page.locator("#pricing")).toContainText("Project Work");
  await expect(page.locator("#pricing")).toContainText("Ongoing Support");
  await expect(page.locator("#contact")).toContainText("Tell me where your business is now");
});
