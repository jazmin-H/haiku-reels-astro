import { test, expect } from '@playwright/test';

test('validacion de mensaje de error con campos vacíos.', async ({ page }) => {
  await page.goto('http://localhost:4321/haiku-reels-astro');
  await page.locator('section').filter({ hasText: 'Haiku Reels' }).getByRole('button').click();
  await page.getByRole('list').getByRole('link').nth(3).click();
  await page.getByRole('link', { name: 'Registrarte' }).click();
  await page.getByRole('button', { name: 'Registrar' }).click();
  await expect(page.getByRole('textbox', { name: 'Nombre de usuario' })).toBeVisible();
  await expect(page.getByText('El nombre de usuario debe')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Correo electrónico' })).toBeVisible();
  await expect(page.getByText('Ingresa un correo electrónico')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toBeVisible();
  await expect(page.getByText('La contraseña debe tener al')).toBeVisible();
  await expect(page.getByText('Acepto los Términos y')).toBeVisible();
  await expect(page.getByText('Invalid input: expected true')).toBeVisible();
});