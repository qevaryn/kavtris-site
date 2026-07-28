import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Lance aplicações web/i })).toBeVisible();
  await expect(page.locator('p', { hasText: 'Painel de Qualidade' }).filter({ visible: true }).first()).toBeVisible();
});
