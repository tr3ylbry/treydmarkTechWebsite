import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.NAVIGATION_BASE_URL || "http://127.0.0.1:3150";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "navigation-reflow.spec.ts",
  reporter: "list",
  workers: 1,
  use: { baseURL, contextOptions: { reducedMotion: "reduce" }, screenshot: "only-on-failure" },
  webServer: process.env.NAVIGATION_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --hostname 127.0.0.1 --port 3150",
        url: baseURL,
        reuseExistingServer: false,
      },
  projects: [{ name: "firefox", use: { ...devices["Desktop Firefox"] } }],
});
