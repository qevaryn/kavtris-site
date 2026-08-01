import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tecnologia que conecta\s*processos\. Pessoas\.\s*Resultados\./i })).toBeVisible();
  await expect(page.getByText('Resultados.', { exact: true })).toBeVisible();
  await expect(page.getByText('Painel Operacional')).toHaveCount(0);
  await expect(page.getByTestId('hero-brand-visual').getByAltText('Símbolo Qevaryn Systems')).toBeVisible();
  await expect(page.getByLabel('Serviços principais').getByText('Automação inteligente')).toBeVisible();
  await expect(page).toHaveTitle(/Qevaryn Systems \| Sistemas Web, Automação e Qualidade de Software/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Desenvolvimento de sistemas web/);
  await expect(page.getByLabel('Assinatura institucional').getByText('Integrante da Rede Qualidade é Vida')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Duas marcas. Um propósito.' })).toBeVisible();
});
