import { test, expect } from "@playwright/test";

test.describe("Como lector, deseo un buscador que me permita encontrar haikus por diversos filtros", () => {
	test("Si uso la plabra clave 'nico', deben aparecer como resultado, los haikus de Nicole y Nicolás", async ({
		page,
	}) => {
		await page.goto("http://localhost:4321/haiku-reels-astro");
		await page.locator("#menu-button").click();
		await page.locator("a").filter({ hasText: "/>" }).click();
		await page.getByPlaceholder("Buscar...").click();
		await page.getByPlaceholder("Buscar...").fill("nico");
		await page.getByPlaceholder("Buscar...").press("Enter");
		await page.locator("#search-b").click();
		await expect(page.getByRole("heading", { name: "Nicole Silva" })).toBeVisible();
		await expect(page.getByRole("heading", { name: "Nicolás Ferreiros" })).toBeVisible();
	});
});
