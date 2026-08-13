import { expect, test } from '@playwright/test';

test('desktop navigation opens homepage anchors', async ({ page }) => {
  await page.goto('/');

  const desktopNav = page.getByRole('navigation', { name: 'Navegação principal' });

  await desktopNav.getByRole('link', { name: 'Como funciona', exact: true }).click();
  await expect(page.locator('#como-funciona')).toBeInViewport();

  await expect(desktopNav.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('href', '/produtos');
  await expect(desktopNav.getByRole('link', { name: 'Engenharia', exact: true })).toHaveAttribute('href', '/empresas');
  await expect(desktopNav.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('href', '/sobre');
  await expect(desktopNav.getByRole('link', { name: 'Contacto', exact: true })).toHaveAttribute('href', '/#contacto');

  await expect(desktopNav.getByRole('link', { name: 'O que resolvemos', exact: true })).toHaveCount(0);
  await expect(desktopNav.getByRole('link', { name: 'Exemplos', exact: true })).toHaveCount(0);
  await expect(desktopNav.getByRole('link', { name: 'Serviços', exact: true })).toHaveCount(0);
  await expect(desktopNav.getByRole('link', { name: 'Descobrir solução', exact: true })).toHaveCount(0);
});

test('desktop navigation Engineering item opens the /empresas page', async ({ page }) => {
  await page.goto('/');

  const desktopNav = page.getByRole('navigation', { name: 'Navegação principal' });
  await desktopNav.getByRole('link', { name: 'Engenharia', exact: true }).click();
  await expect(page).toHaveURL(/\/empresas$/);
  await expect(page.getByRole('heading', { name: /Tecnologia adaptada à realidade/i })).toBeVisible();
});
