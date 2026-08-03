import { test, expect } from '@playwright/test';

test('menu desktop navega por âncoras', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'O que resolvemos', exact: true }).click();
  await expect(page.locator('#problemas')).toBeInViewport();

  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Descobrir solução', exact: true }).click();
  await expect(page.locator('#simulador')).toBeInViewport();
});

test('páginas legais, rede e empresas abrem corretamente', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: 'Política de Privacidade' })).toBeVisible();

  await page.goto('/cookies');
  await expect(page.getByRole('heading', { name: 'Política de Cookies' })).toBeVisible();

  await page.goto('/rede-qualidade-e-vida');
  await expect(page.getByRole('heading', { name: /Empresas independentes/i })).toBeVisible();
  await expect(page.getByText('Marca institucional', { exact: true })).toBeVisible();
  await expect(page.getByText('Empresa operadora', { exact: true })).toBeVisible();
  await expect(page.getByText(/estrutura jurídica e contratual da rede encontra-se em desenvolvimento/i)).toBeVisible();

  await page.goto('/empresas');
  await expect(page.getByRole('heading', { name: /Soluções simples de utilizar/i })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/empresas$/);
  await expect(page.getByRole('heading', { name: 'Segurança e proteção de dados' })).toBeVisible();
  await expect(page.getByText('Propriedade do código', { exact: true })).toBeVisible();
  await expect(page.getByText(/não está posicionada como fabricante de máquinas industriais/i)).toBeVisible();
});
