import { test, expect } from '@playwright/test';

test('verificacion de boton de inicio sesion', async ({ page }) => {
    await page.goto('http://localhost:4321/haiku-reels-astro/');
    await page.locator('section').filter({ hasText: 'Haiku Reels' }).getByRole('button').click();
    await page.getByRole('list').getByRole('link').nth(3).click();
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
});
