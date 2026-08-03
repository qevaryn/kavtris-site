import { expect, test } from '@playwright/test';

const productRoutes = [
  { slug: 'fieldops', name: 'Qevaryn FieldOps' },
  { slug: 'stock-orders', name: 'Qevaryn Stock & Orders' },
  { slug: 'hotel-operations', name: 'Qevaryn Hotel Operations' },
  { slug: 'kitchen-sync', name: 'Qevaryn KitchenSync' },
  { slug: 'qevaryn-ops', name: 'Qevaryn Ops' },
  { slug: 'customer-portal', name: 'Qevaryn Customer Portal' }
];

test('catálogo de produtos carrega sem linguagem de loja tradicional', async ({ page }) => {
  await page.goto('/produtos');

  await expect(page.getByRole('heading', { name: /Soluções de software adaptadas/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Conceito de solução').first()).toBeVisible();
  await expect(page.getByText(/Este é um exemplo de solução que pode ser adaptado/i).first()).toBeVisible();
  await expect(page.getByText(/Comprar agora|Adicionar ao carrinho|checkout|carrinho/i)).toHaveCount(0);
});

test('menu principal inclui Produtos e abre o catálogo', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1440, height: 900 });

  const productsLink = page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Produtos', exact: true });

  await expect(productsLink).toHaveAttribute('href', '/produtos');
  await productsLink.click();
  await expect(page).toHaveURL(/\/produtos$/);
});

test('filtros de setor atualizam cartões visíveis', async ({ page }) => {
  await page.goto('/produtos');

  await page.getByRole('button', { name: 'Hotelaria' }).click();
  await expect(page.getByRole('button', { name: 'Hotelaria' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Qevaryn KitchenSync' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Todos' }).click();
  await expect(page.getByRole('heading', { name: 'Qevaryn KitchenSync' })).toBeVisible();
});

test('rotas de produto carregam com detalhes técnicos progressivos', async ({ page }) => {
  for (const product of productRoutes) {
    await page.goto(`/produtos/${product.slug}`);
    await expect(page.getByRole('heading', { name: product.name })).toBeVisible();
    await expect(page.getByText(/Este é um exemplo de solução que pode ser adaptado/i)).toBeVisible();
    const technicalDetails = page.locator('details').filter({ hasText: 'Ver detalhes técnicos' });
    await expect(technicalDetails.locator('summary')).toBeVisible();
    await technicalDetails.locator('summary').click();
    await expect(page.locator('details[open]').filter({ hasText: /API|permissões|dashboard|autenticação|notificações/i })).toBeVisible();
  }
});

test('pedido de adaptação leva ao contacto com produto selecionado', async ({ page }) => {
  await page.goto('/produtos/fieldops');
  await page.getByRole('link', { name: /^Adaptar à minha empresa$/ }).first().click();

  await expect(page).toHaveURL(/\/\?produto=fieldops#contacto$/);
  await expect(page.locator('#contacto')).toBeInViewport();
  await expect(page.getByLabel(/Produto de interesse/)).toHaveValue('Qevaryn FieldOps');
  await expect(page.getByLabel(/Produto de interesse/)).toContainText('Ainda não sei qual solução preciso');
});

test('catálogo não cria overflow horizontal no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/produtos');

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);
  await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible();
});
