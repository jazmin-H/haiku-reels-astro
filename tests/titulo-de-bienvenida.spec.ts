import { test, expect } from '@playwright/test';

test('verificacion del titulo de bienvenida', async ({ page }) => {
    await page.goto('http://localhost:4321/haiku-reels-astro');
    await page.locator('section').filter({ hasText: 'Haiku Reels' }).getByRole('button').click();
    await page.getByRole('list').getByRole('link').nth(3).click();
    await expect(page.getByRole('heading')).toContainText('¡Hola! Bienvenido a Haiku Reels');
});