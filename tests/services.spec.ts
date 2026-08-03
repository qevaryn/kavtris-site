import { test, expect } from '@playwright/test';

test('valida camada simples, exemplos técnicos opcionais e experiência preservada', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByAltText('Qevaryn Systems').first()).toBeVisible();
  await expect(page.getByText('Qualidade é Vida Tech')).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'O que está a dificultar o seu negócio?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Não sei exatamente do que preciso' })).toBeVisible();
  await page.getByRole('button', { name: 'Não sei exatamente do que preciso' }).click();
  await expect(page.getByRole('heading', { name: 'Descobrir a solução certa' })).toBeVisible();
  await expect(page.getByText('Não há problema. Primeiro entendemos como a sua empresa trabalha')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toBeVisible();
  const pedidosCard = page.locator('#exemplos article').filter({ has: page.getByRole('heading', { name: 'Gestão de pedidos' }) });
  const firstTechnicalButton = pedidosCard.getByRole('button');
  await expect(firstTechnicalButton).toHaveAttribute('aria-expanded', 'false');
  await firstTechnicalButton.click();
  await expect(firstTechnicalButton).toHaveAttribute('aria-expanded', 'true');
  await expect(pedidosCard.getByText('Perfis e permissões')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Veja um exemplo sem precisar entender termos técnicos.' })).toBeVisible();
  await page.getByLabel('Tipos de demonstração').getByRole('button', { name: 'Reservas e marcações' }).click();
  await expect(page.locator('#demonstracao h3').filter({ hasText: 'Agenda simples para clientes e equipa' })).toBeVisible();
  await page.getByRole('tab', { name: 'Ver no telemóvel' }).click();
  await expect(page.getByRole('tab', { name: 'Ver no telemóvel' })).toHaveAttribute('aria-selected', 'true');

  await expect(page.getByRole('heading', { name: 'Tecnologia aplicada a problemas reais' })).toBeVisible();
  await expect(page.getByText(/A dimensão do cliente não é o ponto principal/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hotelaria, alojamento e restauração' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Lojas, mercados e comércio' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Empresas maiores e equipas técnicas' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toBeVisible();
  await page.getByRole('button', { name: 'Ainda não sei' }).click();
  await expect(page.getByRole('heading', { name: 'Descoberta e protótipo inicial' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Construção por etapas, com linguagem clara.' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Protótipo/i })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Interface simples, processo técnico por trás.' })).toBeVisible();
  const securityDetails = page.locator('#empresas details').filter({ hasText: 'Segurança e proteção de dados' });
  await securityDetails.locator('summary').click();
  await expect(securityDetails.getByText('Perfis e permissões')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'CareFlow' })).toBeVisible();
  await expect(page.getByText('Conceito de solução que pode ser adaptado ao negócio.').first()).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Plataforma internacional de viagens' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Seguradora multinacional' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Plataforma de Tax Services' })).toBeVisible();

  const insuranceCard = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Seguradora multinacional' }) });
  const taxCard = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Plataforma de Tax Services' }) });

  await expect(insuranceCard.getByText('Robot Framework', { exact: true })).toBeVisible();
  await expect(insuranceCard.getByText('Playwright', { exact: true })).toHaveCount(0);
  await expect(taxCard.getByText('QA Manual', { exact: true })).toBeVisible();
  await expect(taxCard.getByText(/Automação/)).toHaveCount(0);
});
