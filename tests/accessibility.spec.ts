import { test, expect } from '@playwright/test';

test('acessibilidade básica da homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-PT');
  await expect(page.locator('#inicio').getByRole('link', { name: 'Pedir uma análise' })).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
});
