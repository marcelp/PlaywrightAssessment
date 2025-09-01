// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Global test timeout (30 seconds)
  timeout: 30 * 1000,
  
  // Expect timeout for assertions (5 seconds)
  expect: {
    timeout: 5 * 1000,
  },

  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if test.only is left in code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,
  
  // Limit workers on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Test reporter
  reporter: [
    ['html'],
    ['list']
  ],

  // Global test settings
  use: {
    // Browser context options
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    
    // Capture screenshots on failure
    screenshot: 'only-on-failure',
    
    // Capture video on retry
    video: 'retain-on-failure',
    
    // Collect trace when retrying failed tests
    trace: 'on-first-retry',
    
    // Base URL for page.goto() calls
    // baseURL: 'https://www.saucedemo.com',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox', 
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});