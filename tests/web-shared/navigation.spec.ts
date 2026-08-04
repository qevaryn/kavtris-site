import { test, expect } from '@playwright/test';

test('páginas legais, rede e empresas abrem corretamente', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: 'Política de Privacidade' })).toBeVisible();

  await page.goto('/cookies');
  await expect(page.getByRole('heading', { name: 'Política de Cookies' })).toBeVisible();

  await page.goto('/rede-qualidade-e-vida');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Empresas independentes/i })).toBeVisible();
  await expect(page.getByText('Marca institucional', { exact: true })).toBeVisible();
  await expect(page.getByText('Empresa operadora', { exact: true })).toBeVisible();
  await expect(page.getByText(/estrutura jurídica e contratual da rede encontra-se em desenvolvimento/i)).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  await page.goto('/empresas');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Software claro para operações/i })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/empresas$/);
  await expect(page.getByText(/A comunicação começa pelo problema da empresa/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Segurança e acessos' })).toBeVisible();
  await expect(page.getByText(/Propriedade do código, componentes de terceiros/i)).toBeVisible();
  await expect(page.getByText(/não são apresentadas certificações/i)).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
});

test('logotipo do header volta para a homepage a partir de páginas internas', async ({ page }) => {
  await page.goto('/empresas');

  const homeLink = page.getByLabel('Qevaryn Systems - início');
  await expect(homeLink).toHaveAttribute('href', '/#inicio');
  await homeLink.click();
  await expect(page).toHaveURL(/\/#inicio$/);
});
