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

  await expect(page.getByRole('heading', { name: /Encontre uma solução próxima/i })).toBeVisible();
  await expect(page.getByText(/As soluções apresentadas são pontos de partida adaptáveis/i)).toBeVisible();
  await expect(page.getByText('Como usar o catálogo')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('product-card')).toHaveCount(6);
  await expect(page.getByTestId('product-card-visual')).toHaveCount(6);
  await expect(page.getByTestId('custom-solution-card')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ainda não sabe qual solução escolher?' })).toBeVisible();
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

  const filterExpectations = [
    { filter: 'Hotelaria', visible: 'Qevaryn Hotel Operations', hidden: 'Qevaryn KitchenSync' },
    { filter: 'Restauração', visible: 'Qevaryn KitchenSync', hidden: 'Qevaryn FieldOps' },
    { filter: 'Retalho', visible: 'Qevaryn Stock & Orders', hidden: 'Qevaryn FieldOps' },
    { filter: 'Serviços', visible: 'Qevaryn FieldOps', hidden: 'Qevaryn Stock & Orders' },
    { filter: 'Equipas externas', visible: 'Qevaryn FieldOps', hidden: 'Qevaryn Hotel Operations' },
    { filter: 'Gestão', visible: 'Qevaryn Ops', hidden: 'Qevaryn KitchenSync' },
    { filter: 'Clientes', visible: 'Qevaryn Customer Portal', hidden: 'Qevaryn Hotel Operations' }
  ];

  for (const item of filterExpectations) {
    await page.getByRole('button', { name: item.filter }).click();
    await expect(page.getByRole('button', { name: item.filter })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('heading', { name: item.visible })).toBeVisible();
    await expect(page.getByRole('heading', { name: item.hidden })).toHaveCount(0);
    await expect(page.getByTestId('custom-solution-card')).toHaveCount(0);
  }

  await page.getByRole('button', { name: 'Todos' }).click();
  await expect(page.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('product-card')).toHaveCount(6);
  await expect(page.getByTestId('custom-solution-card')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Qevaryn KitchenSync' })).toBeVisible();
});

test('cards do catálogo são vitrines curtas e não duplicam detalhes técnicos', async ({ page }) => {
  await page.goto('/produtos');

  const cards = page.getByTestId('product-card');
  await expect(cards).toHaveCount(6);

  const firstCard = cards.first();
  await expect(firstCard.getByRole('img', { name: /FieldOps/i })).toBeVisible();
  await expect(firstCard.getByText('Equipas externas')).toBeVisible();
  await expect(firstCard.getByText('Demonstração visual')).toBeVisible();
  await expect(firstCard.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(firstCard.getByText('Organize equipas, serviços, visitas, checklists e relatórios num único sistema.')).toBeVisible();
  await expect(firstCard.getByRole('link', { name: 'Ver produto' })).toHaveAttribute('href', '/produtos/fieldops');
  await expect(firstCard.getByRole('link', { name: /Adaptar à minha empresa/ })).toHaveAttribute('href', '/?produto=fieldops#contacto');

  await expect(firstCard.getByText(/Problema que resolve|perfis e permissões|upload seguro|histórico de auditoria|Este é um exemplo de solução/i)).toHaveCount(0);
});

test('card de solução personalizada e CTA final apontam para contacto', async ({ page }) => {
  await page.goto('/produtos');

  const customCard = page.getByTestId('custom-solution-card');
  await expect(customCard.getByRole('heading', { name: 'Não encontrou uma solução parecida?' })).toBeVisible();
  await expect(customCard.getByRole('link', { name: /Falar sobre uma solução personalizada/ })).toHaveAttribute('href', '/?tipo=personalizada#contacto');

  await expect(page.getByRole('link', { name: 'Explique o seu problema' }).last()).toHaveAttribute('href', '/#contacto');
});

test('rotas de produto carregam com detalhes técnicos progressivos', async ({ page }) => {
  for (const product of productRoutes) {
    await page.goto(`/produtos/${product.slug}`);

    if (product.slug === 'fieldops') {
      await expect(page.getByRole('heading', { name: /Organize equipas externas/i })).toBeVisible();
      await expect(page.getByText('Conceito de solução adaptável')).toBeVisible();
      await expect(page.getByText(/Esta apresentação mostra uma possível configuração/i)).toBeVisible();
      const technicalDetails = page.locator('details').filter({ hasText: 'Segurança' });
      await expect(technicalDetails.locator('summary')).toBeVisible();
      await technicalDetails.locator('summary').click();
      await expect(technicalDetails.getByText('autenticação')).toBeVisible();
      continue;
    }

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

test('preview da homepage usa cards visuais simplificados', async ({ page }) => {
  await page.goto('/');

  const preview = page.locator('#produtos-preview');
  await expect(preview.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Precisa de outra solução?' })).toBeVisible();
  await expect(preview.getByRole('link', { name: 'Ver produto' })).toHaveCount(3);
  await expect(preview.getByText(/Problema que resolve|Ver detalhes técnicos|histórico de auditoria/i)).toHaveCount(0);
});

test('catálogo não cria overflow horizontal no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/produtos');

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);
  await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible();
});

test('catálogo mobile mostra cards em uma coluna e botões sem overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/produtos');

  const firstCard = page.getByTestId('product-card').first();
  const secondCard = page.getByTestId('product-card').nth(1);
  const firstBox = await firstCard.boundingBox();
  const secondBox = await secondCard.boundingBox();

  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(Math.round(secondBox!.y)).toBeGreaterThan(Math.round(firstBox!.y + firstBox!.height - 4));

  for (const link of await firstCard.getByRole('link').all()) {
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }
});
