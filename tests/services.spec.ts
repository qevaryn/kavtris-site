import { test, expect } from '@playwright/test';

test('valida os serviços e os projetos profissionais', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('brand-logo').first()).toBeVisible();

  await expect(page.getByRole('heading', { name: 'A sua equipa enfrenta algum destes problemas?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Falhas descobertas em produção/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Testes sem organização/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Regressões frequentes/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Falta de tempo para testar/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Automação difícil de manter/ })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'QA Manual e Análise' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Automação de Testes Web, Mobile e API' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Estruturação e Melhoria de QA' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Análise de Requisitos e Experiência do Utilizador' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'QA Contínuo' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Plataforma internacional de viagens' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Seguradora multinacional' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Plataforma de Tax Services' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Conhecer' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Planear' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Preparar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Testar', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Comunicar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Melhorar' })).toBeVisible();

  const insuranceCard = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Seguradora multinacional' }) });
  const taxCard = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Plataforma de Tax Services' }) });

  await expect(insuranceCard.getByText('Robot Framework', { exact: true })).toBeVisible();
  await expect(insuranceCard.getByText('Playwright', { exact: true })).toHaveCount(0);
  await expect(taxCard.getByRole('heading', { name: 'Plataforma de Tax Services' })).toBeVisible();
  await expect(page.getByText('Playwright').nth(0)).toBeVisible();
  await expect(taxCard.getByText('QA Manual', { exact: true })).toBeVisible();
  await expect(taxCard.getByText(/Automação/)).toHaveCount(0);
});
