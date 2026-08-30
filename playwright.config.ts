import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  use: {
    baseURL: process.env.WEB_BASE_URL || 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: process.env.WEB_BASE_URL
    ? undefined
    : {
        command: 'node e2e/static-server.mjs',
        port: 4173,
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 12'],
        browserName: 'chromium',
        viewport: { width: 375, height: 812 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
});
