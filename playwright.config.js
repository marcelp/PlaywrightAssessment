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
    ['monocart-reporter', {
      name: "Playwright Assessment Test Report",
      outputFile: './monocart-report/index.html',
      
      // Report styling and branding
      theme: 'dark', // or 'light'
      title: 'PlaywrightAssessment Test Results',
      
      // Coverage configuration
      coverage: {
        // Enable V8 code coverage
        entryFilter: (entry) => true,
        sourceFilter: (sourcePath) => {
          // Include only source files, exclude node_modules and test files
          return sourcePath.search(/src\/|Pages\/|API\//) !== -1;
        },
        ignorePatterns: [
          '**/node_modules/**', 
          '**/tests/**', 
          '**/*.spec.js',
          '**/test-results/**',
          '**/playwright-report/**'
        ]
      },
      
      // Test result features
      attachments: true,
      screenshot: true,
      video: true,
      trace: true,
      
      // Trend comparison (keeps historical data)
      trend: './monocart-report/trend.json',
      
      // Custom columns in the test results
      columns: [
        'index',
        'title',
        'type',
        'project',
        'status',
        'retry',
        'duration',
        'flaky',
        'tags'
      ],
      
      // Custom visitor for test metadata
      visitor: (data, metadata, collecting) => {
        // Add custom metadata or modify test data
        if (collecting) {
          data.customMetadata = {
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
            browser: metadata.project || 'unknown'
          };
        }
      }
    }],
    ['list'] // Keep list reporter for console output
  ],

  // Global test settings
  use: {
    // Browser context options
    headless: process.env.CI ? true : true,
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