import { expect, test } from '@playwright/test';

test('desktop header products link opens catalog', async ({ page }) => {
  await page.goto('/');

  const productsLink = page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Produtos', exact: true });

  await expect(productsLink).toHaveAttribute('href', '/produtos');
  await productsLink.click();
  await expect(page).toHaveURL(/\/produtos$/);
});
