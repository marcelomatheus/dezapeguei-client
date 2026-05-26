import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120000,
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: process.env.E2E_API_BASE_URL ?? 'http://localhost:8080/v1',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  reporter: [['list']],
});
