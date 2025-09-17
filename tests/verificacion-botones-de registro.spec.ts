import { test, expect } from '@playwright/test';

test('verificacion del buton de registro', async ({ page }) => {
    await page.goto('http://localhost:4321/haiku-reels-astro/');
    await page.locator('section').filter({ hasText: 'Haiku Reels' }).getByRole('button').click();
    await page.getByRole('list').getByRole('link').nth(3).click();
    await page.getByRole('link', { name: 'Registrarte' }).click();
    await page.getByRole('button', { name: 'Registrar' }).click();
});