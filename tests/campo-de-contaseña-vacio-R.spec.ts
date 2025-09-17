import { test, expect } from '@playwright/test';

test('verficacion de contraseña vacio como si es menor a 8 caracteres.', async ({ page }) => {
  await page.goto('http://localhost:4321/haiku-reels-astro/autenticacion/bienvenida/');
  await page.getByRole('link', { name: 'Registrarte' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario' }).fill('luz');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('luz@gmail.com');
  await page.getByRole('checkbox', { name: 'Acepto los Términos y' }).check();
  await page.getByRole('button', { name: 'Registrar' }).click();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toBeVisible();
  await expect(page.getByText('La contraseña debe tener al')).toBeVisible();
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('luz123');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('ArrowLeft');
  await page.getByRole('button', { name: 'Registrar' }).click();
  await expect(page.getByRole('textbox', { name: 'Contraseña' })).toBeVisible();
  await expect(page.getByText('La contraseña debe tener al')).toBeVisible();
});