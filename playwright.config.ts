// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import "dotenv/config"; // 👈 importante: carga .env automáticamente


export default defineConfig({
	testMatch: "**/*.spec.ts",
	fullyParallel: true,
	forbidOnly: !!(process.env.CI === "ON"),
	retries: process.env.CI === "ON" ? 2 : 0,
	workers: process.env.CI === "ON" ? 1 : undefined,
	reporter: "html",


	// Global setup y teardown
	globalSetup: "./tests/utils/global-setup.ts",
	globalTeardown: "./tests/utils/global-teardown.ts",


	use: {
		baseURL: "http://localhost:4321/haiku-reels-astro",
		trace: "on-first-retry",
	},


	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],


	webServer: {
		command: "bun run dev",
		url: "http://localhost:4321/haiku-reels-astro",
		reuseExistingServer: !(process.env.CI === "ON"),
	},
});
