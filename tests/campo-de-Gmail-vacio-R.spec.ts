import { test, expect } from '@playwright/test';

test('verificacion del campo Gmail vacio, mensaje de error.', async ({ page }) => {
  await page.goto('http://localhost:4321/haiku-reels-astro/autenticacion/bienvenida/');
  await page.locator('.contenido-frontal > div').first().click();
  await page.getByRole('link', { name: 'Registrarte' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario' }).fill('luz');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('luz123');
  await page.getByRole('checkbox', { name: 'Acepto los Términos y' }).check();
  await page.getByRole('button', { name: 'Registrar' }).click();
  await expect(page.getByRole('textbox', { name: 'Correo electrónico' })).toBeVisible();
  await expect(page.getByText('Ingresa un correo electrónico')).toBeVisible();
});