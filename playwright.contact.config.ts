import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 timeout: 60_000,
 testDir: './tests/e2e', testMatch: /(?:homepage|contact-hardening)\.spec\.ts$/, reporter: 'list',
 use: { baseURL: 'http://localhost:3106' },
 webServer: { command: 'npm run dev -- --port 3106', url: 'http://localhost:3106', reuseExistingServer: false, env: { CONTACT_FORM_ALLOWED_ORIGINS: 'http://localhost:3106' } },
 projects: [
 { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
 { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
 { name: 'webkit', use: { ...devices['Desktop Safari'] } },
 { name: 'mobile', use: { ...devices['iPhone 13'] } },
 ]
});
