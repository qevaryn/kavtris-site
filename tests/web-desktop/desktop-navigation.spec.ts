import { expect, test } from '@playwright/test';

test('desktop navigation opens homepage anchors', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'O que resolvemos', exact: true }).click();
  await expect(page.locator('#problemas')).toBeInViewport();

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Descobrir solução', exact: true }).click();
  await expect(page.locator('#problemas')).toBeInViewport();
});
