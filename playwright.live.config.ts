import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.LIVE_BASE_URL ?? 'https://claudiodearaujo-site.onrender.com';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
