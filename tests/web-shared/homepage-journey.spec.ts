import { test, expect } from '@playwright/test';

test('homepage usa uma jornada curta de descoberta, produtos, processo e confiança', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('KAVTRIS', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Qualidade é Vida Tech')).toHaveCount(0);

  // WEB.1A — the Solution Finder ("Descobrir solução") is no longer rendered on the homepage.
  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toHaveCount(0);
  await expect(page.locator('#problemas')).toHaveCount(0);

  // How we work / diagnosis carousel now sits directly after the hero.
  const howWeWork = page.locator('#processo');
  await expect(howWeWork.getByRole('heading', { name: 'Do diagnóstico à solução, sem complicação.' })).toBeVisible();
  const processCarousel = howWeWork.getByTestId('process-carousel');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');
  await expect(processCarousel.getByRole('heading', { name: 'Identificar' })).toBeVisible();

  const preview = page.locator('#produtos-preview');
  const productsCarousel = preview.getByTestId('featured-products-carousel');
  await expect(productsCarousel).toBeVisible();
  await expect(productsCarousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(productsCarousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toHaveCount(1);
  await expect(productsCarousel.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toHaveCount(1);
  await expect(productsCarousel.getByRole('heading', { name: 'Solução personalizada para o seu contexto' })).toHaveCount(1);
  await expect(preview.getByRole('link', { name: 'Ver produto' })).toHaveCount(3);
  await expect(preview.getByRole('link', { name: 'Ver todos os produtos' })).toHaveAttribute('href', '/produtos');

  await expect(page.getByRole('heading', { name: 'Do diagnóstico à solução, sem complicação.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Identificar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Entender' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Propor' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Implementar' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Evoluir' })).toHaveCount(1);

  const enterprise = page.locator('#empresas');
  await expect(enterprise.getByRole('heading', { name: 'Simples para usar. Engenharia por trás.' })).toBeVisible();
  // WEB.1B — desktop renders the approved structured capability grid
  // (ENGINEERING_DESKTOP_GRID = YES); the carousel is the mobile/tablet variant.
  const enterpriseGrid = enterprise.getByTestId('enterprise-capabilities-grid');
  await expect(enterpriseGrid).toBeVisible();
  for (const title of ['Segurança e acessos', 'Qualidade e testes', 'Integrações e arquitetura', 'Suporte e continuidade']) {
    await expect(enterpriseGrid.getByText(title)).toBeVisible();
  }
  await expect(enterprise.getByTestId('enterprise-capabilities-carousel')).toBeHidden();
  await expect(enterprise.getByRole('link', { name: 'Ver capacidades técnicas' })).toHaveAttribute('href', '/empresas');

  const networkPreview = page.locator('#rede');
  await expect(networkPreview.getByText('Rede Qualidade é Vida').first()).toBeVisible();
  await expect(networkPreview.getByRole('heading', { name: 'Tecnologia integrada a uma rede criada para servir melhor.' })).toBeVisible();
  await expect(networkPreview.getByRole('link', { name: 'Conhecer a Rede' })).toHaveAttribute('href', '/rede-qualidade-e-vida');
  await expect(networkPreview.getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Veja um exemplo sem precisar entender termos técnicos.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'CareFlow' })).toHaveCount(0);
});
