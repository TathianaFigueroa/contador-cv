// Purpose: Playwright configuration for the acceptance tests — three engines, the product reached by its service name, results written for the record.
const { defineConfig, devices } = require('@playwright/test');

const PRODUCT = process.env.PRODUCT_HOST ? 'http://' + process.env.PRODUCT_HOST + ':' + (process.env.PRODUCT_PORT || '8080') : 'http://127.0.0.1:8123';

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: /.*\.spec\.js/,
  outputDir: '/results/artifacts',
  timeout: 60000,
  retries: 0,
  reporter: [['list'], ['junit', { outputFile: '/results/results.xml' }]],
  use: {
    baseURL: PRODUCT,
    trace: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], launchOptions: { args: ['--unsafely-treat-insecure-origin-as-secure=' + (PRODUCT)] } } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
