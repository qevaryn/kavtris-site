import { test, expect } from '@playwright/test';

test('valida soluções, sectores, rede e projetos profissionais', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('brand-logo').first()).toBeVisible();
  await expect(page.getByAltText('Qevaryn Systems').first()).toBeVisible();
  await expect(page.getByText('Qualidade é Vida Tech')).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'Quando as ferramentas atuais deixam de acompanhar o negócio' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Tarefas repetitivas/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Dados espalhados/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Sistemas isolados/ })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Sistemas e aplicações web' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Automação de processos' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ferramentas internas e painéis' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Integrações e APIs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'QA e qualidade de software' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'MVPs e protótipos digitais' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Restaurantes e comércio local' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Empresas de serviços' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Startups e empresas de software' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pequenas e médias empresas' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Plataforma internacional de viagens' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Seguradora multinacional' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Plataforma de Tax Services' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Entender o problema' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Definir prioridades' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Planear o MVP' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Desenvolver e testar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Publicar e acompanhar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Melhorar continuamente' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Tecnologia independente, ligada a um padrão comum de qualidade' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Conhecer a Rede Qualidade é Vida' })).toHaveAttribute('href', '/rede-qualidade-e-vida');

  const insuranceCard = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Seguradora multinacional' }) });
  const taxCard = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Plataforma de Tax Services' }) });

  await expect(insuranceCard.getByText('Robot Framework', { exact: true })).toBeVisible();
  await expect(insuranceCard.getByText('Playwright', { exact: true })).toHaveCount(0);
  await expect(taxCard.getByText('QA Manual', { exact: true })).toBeVisible();
  await expect(taxCard.getByText(/Automação/)).toHaveCount(0);
});
