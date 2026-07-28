import { test, expect } from '@playwright/test';

test('menu desktop navega por âncoras', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Serviços', exact: true }).click();
  await expect(page.locator('#servicos')).toBeInViewport();

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Experiência', exact: true }).click();
  await expect(page.locator('#experiencia')).toBeInViewport();
});
