import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tecnologia que/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Gera resultados\./ })).toBeVisible();
  await expect(page.getByText(/A KAVTRIS combina consultoria, engenharia e tecnologia/i)).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver como funciona' })).toHaveAttribute('href', '#como-funciona');
  await expect(page.getByRole('link', { name: 'Falar com a KAVTRIS' })).toHaveAttribute('href', '#contacto');
  await expect(page.getByText('Painel Operacional')).toHaveCount(0);
  await expect(page.getByTestId('hero-brand-visual').getByAltText('Símbolo KAVTRIS')).toBeVisible();
  await expect(page.getByTestId('services-ticker').getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(page.getByTestId('services-ticker').getByText('Automação inteligente').first()).toBeVisible();
  await expect(page).toHaveTitle(/KAVTRIS \| Sistemas Web, Automação e Qualidade de Software/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Desenvolvimento de sistemas web/);
  await expect(page.getByLabel('Assinatura institucional')).toHaveCount(0);
  // WEB.1A — the Solution Finder is no longer rendered on the homepage.
  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toHaveCount(0);
  // WEB.1F.5 — "Como funciona" (customer-path selector) sits directly after the hero.
  await expect(page.locator('#como-funciona').getByRole('heading', { name: 'Comece pelo caminho mais simples para a sua empresa.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Identificar' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Simples para usar. Engenharia por trás.' })).toHaveCount(0);
  await expect(page.locator('#rede').getByText('Rede Qualidade é Vida').first()).toBeVisible();
  await expect(page.locator('#rede').getByRole('heading', { name: 'Tecnologia integrada a uma rede criada para servir melhor.' })).toBeVisible();
  await expect(page.locator('#rede').getByRole('link', { name: 'Conhecer a Rede' })).toHaveAttribute('href', '/rede-qualidade-e-vida');
  await expect(page.locator('#rede').getByRole('link', { name: 'Conhecer a nossa história' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);
  await expect(page.getByText(/A sua fé cristã inspira princípios/)).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Conhecer o fundador' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toHaveCount(0);
});
