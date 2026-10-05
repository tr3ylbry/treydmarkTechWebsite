import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir: './tests/e2e', testMatch: /(?:homepage|portfolio-gate)\.spec\.ts$/, reporter: 'list',
 use: { baseURL: 'http://localhost:3104' },
 webServer: { command: 'npm run dev -- --port 3104', url: 'http://localhost:3104', reuseExistingServer: false },
 projects: [
 { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
 { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
 { name: 'webkit', use: { ...devices['Desktop Safari'] } },
 { name: 'mobile', use: { ...devices['iPhone 13'] } },
 ]
});
