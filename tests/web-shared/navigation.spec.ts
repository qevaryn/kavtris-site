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
  await expect(page.getByRole('heading', { name: /Tecnologia adaptada à realidade da sua empresa/i })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/empresas$/);
  await expect(page.getByText(/Não precisa saber qual sistema precisa antes de falar connosco/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Segurança e acessos' })).toBeVisible();
  await expect(page.getByText(/Propriedade do código, componentes de terceiros/i)).toBeVisible();
  await expect(page.getByText(/não são apresentadas certificações/i)).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  await page.goto('/sobre');
  await expect(page.getByRole('heading', { name: 'Construída com propósito, qualidade e vontade de servir.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Onde tudo começou' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ver perfil profissional no LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '/sobre');
});

test('logotipo do header volta para a homepage a partir de páginas internas', async ({ page }) => {
  await page.goto('/empresas');

  const homeLink = page.getByLabel(/KAVTRIS — Technology & Consulting/i);
  await expect(homeLink).toHaveAttribute('href', '/#inicio');
  await homeLink.click();
  await expect(page).toHaveURL(/\/#inicio$/);
});
