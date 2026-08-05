import { test, expect } from '@playwright/test';

test('homepage usa uma jornada curta de descoberta, produtos, processo e confiança', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByAltText('Qevaryn Systems').first()).toBeVisible();
  await expect(page.getByText('Qualidade é Vida Tech')).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Centralizar operações' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Organizar equipas externas' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Controlar stock e pedidos' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Melhorar atendimento ao cliente' })).toBeVisible();

  const finder = page.locator('#problemas');
  const desktopResult = finder.getByTestId('solution-desktop-result');
  await expect(desktopResult.getByRole('heading', { name: 'Escolha uma opção para ver a recomendação.' })).toBeVisible();

  await page.getByRole('button', { name: 'Organizar equipas externas' }).click();
  await expect(desktopResult.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(desktopResult.getByText('Organize serviços, visitas, checklists, evidências e relatórios num único sistema.')).toBeVisible();
  await expect(desktopResult.getByRole('link', { name: /Ver como funciona/ })).toHaveAttribute('href', '/produtos/fieldops');
  await expect(desktopResult.getByRole('link', { name: 'Falar sobre esta solução' })).toHaveAttribute('href', '/?produto=fieldops#contacto');

  await expect(finder.getByText('Ainda não sabe o que precisa?')).toHaveCount(2);
  await expect(finder.getByRole('link', { name: 'Explique o seu problema' }).first()).toHaveAttribute('href', '#contacto');

  const preview = page.locator('#produtos-preview');
  const desktopProductsGrid = preview.getByTestId('featured-products-desktop-grid');
  await expect(desktopProductsGrid).toBeVisible();
  await expect(desktopProductsGrid.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(desktopProductsGrid.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(desktopProductsGrid.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(desktopProductsGrid.getByRole('heading', { name: 'Solução personalizada para o seu contexto' })).toBeVisible();
  await expect(preview.getByTestId('featured-products-carousel')).toBeHidden();
  await expect(preview.getByRole('link', { name: 'Ver produto' })).toHaveCount(3);
  await expect(preview.getByRole('link', { name: 'Ver todos os produtos' })).toHaveAttribute('href', '/produtos');

  await expect(page.getByRole('heading', { name: 'Um processo simples para chegar à solução certa.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();

  const enterprise = page.locator('#empresas');
  await expect(enterprise.getByRole('heading', { name: 'Interface simples, processo técnico por trás.' })).toBeVisible();
  const enterpriseDesktopGrid = enterprise.getByTestId('enterprise-capabilities-desktop-grid');
  await expect(enterpriseDesktopGrid).toBeVisible();
  await expect(enterpriseDesktopGrid.getByText('Segurança e acessos')).toBeVisible();
  await expect(enterpriseDesktopGrid.getByText('Qualidade e testes')).toBeVisible();
  await expect(enterpriseDesktopGrid.getByText('Integrações e arquitetura')).toBeVisible();
  await expect(enterpriseDesktopGrid.getByText('Suporte e continuidade')).toBeVisible();
  await expect(enterprise.getByTestId('enterprise-capabilities-mobile-details')).toBeHidden();
  await expect(enterprise.getByTestId('enterprise-capabilities-ticker')).toBeHidden();
  await expect(enterprise.getByRole('link', { name: 'Ver capacidades técnicas' })).toHaveAttribute('href', '/empresas');

  const aboutPreview = page.locator('#sobre');
  await expect(aboutPreview.getByText('Sobre a Qevaryn')).toBeVisible();
  await expect(aboutPreview.getByRole('heading', { name: 'Uma empresa construída com propósito.' })).toBeVisible();
  await expect(aboutPreview.getByRole('link', { name: 'Conhecer a nossa história' })).toHaveAttribute('href', '/sobre');
  await expect(aboutPreview.getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Veja um exemplo sem precisar entender termos técnicos.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'CareFlow' })).toHaveCount(0);
});
