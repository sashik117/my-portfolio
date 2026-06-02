import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  webServer: {
    command: "npm run dev -- --hostname 0.0.0.0 --port 3178",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: "http://localhost:3178"
  },
  use: {
    baseURL: "http://localhost:3178",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] }
    }
  ]
});
