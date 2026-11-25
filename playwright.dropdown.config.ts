import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /(?:homepage|contact-hardening|inquiry-dropdown-keyboard)\.spec\.ts$/,
  reporter: "list",
  workers: 1,
  use: { baseURL: "http://localhost:3106", screenshot: "only-on-failure" },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3106",
    url: "http://localhost:3106",
    reuseExistingServer: false,
    env: { CONTACT_FORM_ALLOWED_ORIGINS: "http://localhost:3106" },
  },
  projects: [{ name: "firefox", use: { ...devices["Desktop Firefox"] } }],
});
