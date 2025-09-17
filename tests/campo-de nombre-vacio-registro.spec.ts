import { test, expect } from '@playwright/test';

test('campo de nombre vacio de formulario de registro', async ({ page }) => {
  await page.goto('http://localhost:4321/haiku-reels-astro/autenticacion/bienvenida/');
  await page.getByRole('link', { name: 'Registrarte' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('luz@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('L');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Luz123');
  await page.getByRole('checkbox', { name: 'Acepto los Términos y' }).check();
  await page.locator('div').filter({ hasText: 'Crea tu cuentaNombre de' }).nth(2).click();
  await page.getByRole('button', { name: 'Registrar' }).click();
  await expect(page.getByRole('textbox', { name: 'Nombre de usuario' })).toBeVisible();
  await expect(page.getByText('El nombre de usuario debe')).toBeVisible();
  await page.getByRole('textbox', { name: 'Nombre de usuario' }).click();
});