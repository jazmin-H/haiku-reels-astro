import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	// Look for test files in the "tests" directory, relative to this configuration file.
	// testDir: "tests-e2e",
	//
	// Glob patterns or regular expressions that match test files.
	testMatch: "**/*.spec.ts",

	// Run all tests in parallel.
	fullyParallel: true,

	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!(process.env.CI === "ON"),

	// Retry on CI only.
	retries: process.env.CI === "ON" ? 2 : 0,

	// Opt out of parallel tests on CI.
	workers: process.env.CI === "ON" ? 1 : undefined,

	// Reporter to use
	reporter: "html",

	// Global setup for all tests.
	// globalSetup: "./tests/utils/global.setup.ts",

	// Global teardown for all tests.
	// globalTeardown: "./tests/utils/global.teardown.ts",

	use: {
		// Base URL to use in actions like `await page.goto('/')`.
		baseURL: "http://localhost:4321/haiku-reels-astro",

		// Collect trace when retrying the failed test.
		trace: "on-first-retry",
	},
	// Configure projects for major browsers.
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	// Run your local dev server before starting the tests.
	webServer: {
		command: "bun run dev",
		url: "http://localhost:4321/haiku-reels-astro",
		reuseExistingServer: !(process.env.CI === "ON"),
	},
});
