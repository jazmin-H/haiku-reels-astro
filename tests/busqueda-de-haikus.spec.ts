import { test, expect } from "@playwright/test";

test.describe("Como lector, deseo un buscador que me permita encontrar haikus por diversos filtros", () => {
	test("Si uso la plabra clave 'nico', deben aparecer como resultado, los haikus de Nicole y Nicolás", async ({
		page,
	}) => {
		await page.goto("http://localhost:4321/haiku-reels-astro/busqueda-de-haikus/");
		/*await page
			.locator("section")
			.filter({ hasText: "Haiku Reels La poesía es un" })
			.getByRole("button")
			.click();
		
		await page.getByRole("link").nth(1).click();	*/
		await page.getByRole("textbox", { name: "Buscar" }).click();
		await page.getByRole("textbox", { name: "Buscar" }).fill("nico");
		await expect(page.getByText("Por Nicolás Ferreiros")).toBeVisible();
		await expect(page.getByText("Por Nicole Silva")).toBeVisible();
	});
});
