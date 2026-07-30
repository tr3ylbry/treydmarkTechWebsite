import { expect, test } from "@playwright/test";

test("renders the homepage pricing and contact sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Treydmark Tech/);
  await expect(page.locator("#pricing")).toContainText("Investment shaped by scope, not templates.");
  await expect(page.locator("#pricing")).toContainText("Ongoing Support");
  await expect(page.locator("#contact")).toContainText("Let’s talk about what needs to change.");
});

test("centers decorative list markers against wrapped text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");

  for (const selector of ["#services ul li", "#pricing ul li", "#about ul li"]) {
    const centerDeltas = await page.locator(selector).evaluateAll((items) =>
      items.map((item) => {
        const marker = item.firstElementChild?.getBoundingClientRect();
        const text = item.lastElementChild?.getBoundingClientRect();

        if (!marker || !text) {
          throw new Error("Missing marker or text.");
        }

        return Math.abs(
          marker.top + marker.height / 2 - (text.top + text.height / 2),
        );
      }),
    );

    expect(centerDeltas.length).toBeGreaterThan(0);
    expect(Math.max(...centerDeltas)).toBeLessThanOrEqual(1);
  }
});
