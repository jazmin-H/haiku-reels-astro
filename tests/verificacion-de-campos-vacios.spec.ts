import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:4321/haiku-reels-astro/autenticacion/bienvenida/');
    await page.getByRole('link', { name: 'Registrarte' }).click();
    await page.getByRole('button', { name: 'Registrar' }).click();
    await expect(page.locator('form')).toContainText('El nombre de usuario debe tener al menos 3 caracteres.');
    await expect(page.locator('form')).toContainText('Ingresa un correo electrónico válido.');
    await expect(page.locator('form')).toContainText('La contraseña debe tener al menos 6 caracteres.');
    await expect(page.locator('form')).toContainText('Invalid input: expected true');
    await expect(page.getByText('El nombre de usuario debe')).toBeVisible();
    await page.getByText('El nombre de usuario debe').click();
    await expect(page.getByText('El nombre de usuario debe')).toBeVisible();
    await page.goto('http://localhost:4321/haiku-reels-astro/autenticacion/register');
});