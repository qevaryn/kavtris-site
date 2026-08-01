import { test, expect } from '@playwright/test';

test('menu desktop navega por âncoras', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Soluções', exact: true }).click();
  await expect(page.locator('#solucoes')).toBeInViewport();

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Experiência', exact: true }).click();
  await expect(page.locator('#experiencia')).toBeInViewport();
});

test('páginas legais e página da rede abrem corretamente', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: 'Política de Privacidade' })).toBeVisible();

  await page.goto('/cookies');
  await expect(page.getByRole('heading', { name: 'Política de Cookies' })).toBeVisible();

  await page.goto('/rede-qualidade-e-vida');
  await expect(page.getByRole('heading', { name: /Empresas independentes/i })).toBeVisible();
  await expect(page.getByText('Marca institucional', { exact: true })).toBeVisible();
  await expect(page.getByText('Empresa operadora', { exact: true })).toBeVisible();
  await expect(page.getByText(/estrutura jurídica e contratual da rede encontra-se em desenvolvimento/i)).toBeVisible();
});
