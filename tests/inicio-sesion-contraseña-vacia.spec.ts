import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:4321/haiku-reels-astro');
    await page.locator('section').filter({ hasText: 'Haiku Reels' }).getByRole('button').click();
    await page.getByRole('list').getByRole('link').nth(3).click();
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('shoto@gmail.com');
    await page.getByRole('button', { name: 'IniciarSesion' }).click();
    await expect(page.getByText('La contraseña es requerida.')).toBeVisible();
});