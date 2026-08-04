import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Transformamos tarefas\s*complicadas em\s*sistemas simples de utilizar\./i })).toBeVisible();
  await expect(page.getByText(/Não precisa perceber de tecnologia\. Explique-nos como a sua empresa funciona/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ver soluções' })).toHaveAttribute('href', '/produtos');
  await expect(page.getByText('Painel Operacional')).toHaveCount(0);
  await expect(page.getByTestId('hero-brand-visual').getByAltText('Símbolo Qevaryn Systems')).toBeVisible();
  await expect(page.getByLabel('Serviços principais').getByText('Reduzir tarefas manuais')).toBeVisible();
  await expect(page.getByLabel('Serviços principais').getByText('Automação inteligente')).toBeVisible();
  await expect(page).toHaveTitle(/Qevaryn Systems \| Sistemas Web, Automação e Qualidade de Software/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Desenvolvimento de sistemas web/);
  await expect(page.getByLabel('Assinatura institucional').getByText('Integrante da Rede')).toBeVisible();
  await expect(page.getByLabel('Assinatura institucional').getByAltText('Rede Qualidade é Vida')).toBeVisible();
  await expect(page.getByLabel('Assinatura institucional').getByRole('link', { name: 'Conhecer a Rede' })).toHaveAttribute('href', '/rede-qualidade-e-vida');
  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toHaveCount(0);
});
