import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir: './tests/e2e', testMatch: 'external-preview-load.spec.ts', reporter: 'list',
 timeout: 150_000,
 use: { baseURL: 'http://localhost:3105', ...devices['Desktop Chrome'] },
 webServer: { command: 'npm run dev -- --port 3105', url: 'http://localhost:3105', reuseExistingServer: false },
});
