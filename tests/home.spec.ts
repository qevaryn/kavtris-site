import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tecnologia simples para negócios reais\s*sistemas simples de utilizar\./i })).toBeVisible();
  await expect(page.getByText('Transformamos tarefas complicadas em sistemas simples de utilizar. Criamos soluções web e mobile para organizar processos, poupar tempo e ajudar empresas a trabalhar melhor.')).toBeVisible();
  await expect(page.getByText('Não precisa perceber de tecnologia. Conte-nos como a sua empresa funciona e onde estão as dificuldades.')).toBeVisible();
  await expect(page.getByText('Painel Operacional')).toHaveCount(0);
  await expect(page.getByTestId('hero-brand-visual').getByAltText('Símbolo Qevaryn Systems')).toBeVisible();
  await expect(page.getByLabel('Serviços principais').getByText('Automação inteligente')).toBeVisible();
  await expect(page).toHaveTitle(/Qevaryn Systems \| Sistemas Web, Automação e Qualidade de Software/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Desenvolvimento de sistemas web/);
  await expect(page.getByLabel('Assinatura institucional').getByText('Integrante da Rede')).toBeVisible();
  await expect(page.getByLabel('Assinatura institucional').getByAltText('Rede Qualidade é Vida')).toBeVisible();
  await expect(page.getByLabel('Assinatura institucional').getByRole('link', { name: 'Conhecer a Rede' })).toHaveAttribute('href', '/rede-qualidade-e-vida');
  await expect(page.getByRole('heading', { name: 'O que está a dificultar o seu negócio?' })).toBeVisible();
});
