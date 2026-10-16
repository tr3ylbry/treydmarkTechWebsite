import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "canonical.spec.ts",
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://localhost:3107", ...devices["Desktop Chrome"] },
  webServer: {
    command: "npm run start -- --port 3107",
    url: "http://localhost:3107",
    reuseExistingServer: false,
  },
});
