import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Sistemas simples para organizar e automatizar a sua empresa\./i })).toBeVisible();
  await expect(page.getByText(/Escolha um produto por assinatura ou fale connosco sobre uma solução personalizada/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Encontrar uma solução' })).toHaveAttribute('href', '#problemas');
  await expect(page.getByRole('link', { name: 'Ver produtos' })).toHaveAttribute('href', '/produtos');
  await expect(page.getByText('Painel Operacional')).toHaveCount(0);
  await expect(page.getByTestId('hero-brand-visual').getByAltText('Símbolo KAVTRIS')).toBeVisible();
  await expect(page.getByTestId('services-ticker').getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(page.getByTestId('services-ticker').getByText('Automação inteligente').first()).toBeVisible();
  await expect(page).toHaveTitle(/KAVTRIS \| Sistemas Web, Automação e Qualidade de Software/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Desenvolvimento de sistemas web/);
  await expect(page.getByLabel('Assinatura institucional')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toBeVisible();
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
