import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3000';
const shouldStartLocalServer = !process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html'], ['list']] : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry'
  },
  webServer: shouldStartLocalServer
    ? {
        command: process.env.CI ? 'npm run start' : 'npm run dev',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120000
      }
    : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true
      }
    }
  ]
});
