import { test, expect } from '@playwright/test';

test.describe('F001: page titles do not duplicate the brand suffix', () => {
  const routes = [
    { path: '/', title: /^Qevaryn Systems \| Sistemas Web, Automação e Qualidade de Software$/ },
    { path: '/produtos', title: /^Produtos e Soluções de Software \| Qevaryn Systems$/ },
    { path: '/empresas', title: /^Soluções para Empresas \| Qevaryn Systems$/ },
    { path: '/sobre', title: /^Sobre a Qevaryn Systems \| Qevaryn Systems$/ },
    { path: '/produtos/fieldops', title: /^Qevaryn FieldOps \| Gestão de Equipas e Serviços Externos \| Qevaryn Systems$/ },
    { path: '/produtos/kitchen-sync', title: /^Qevaryn KitchenSync \| Produto adaptável \| Qevaryn Systems$/ }
  ];

  for (const route of routes) {
    test(`${route.path} has a non-duplicated title`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page).toHaveTitle(route.title);
      const title = await page.title();
      expect(title.match(/\| Qevaryn Systems/g)?.length ?? 0).toBeLessThanOrEqual(1);
    });
  }
});

test.describe('F002: policy pages expose a single H1 and page metadata', () => {
  test('/cookies has an H1 and specific title', async ({ page }) => {
    await page.goto('/cookies');
    await expect(page.getByRole('heading', { level: 1, name: 'Política de Cookies' })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/^Política de Cookies \| Qevaryn Systems$/);
  });

  test('/privacy has an H1 and specific title', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByRole('heading', { level: 1, name: 'Política de Privacidade' })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/^Política de Privacidade \| Qevaryn Systems$/);
  });
});

test.describe('F003: custom not-found page', () => {
  test('renders a localized 404 with a link home', async ({ page }) => {
    await page.goto('/__qa-nonexistent-route');
    await expect(page.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeVisible();
    await expect(page.getByText('A página que procura não existe ou foi movida.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Voltar à página inicial' })).toHaveAttribute('href', '/');
  });

  test('renders localized 404 for an unknown product slug', async ({ page }) => {
    await page.goto('/produtos/slug-inexistente-qa');
    await expect(page.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeVisible();
  });
});
