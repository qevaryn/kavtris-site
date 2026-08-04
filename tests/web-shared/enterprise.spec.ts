import { expect, test } from '@playwright/test';

test('página empresarial carrega com navegação, hero e CTAs corretos', async ({ page }) => {
  await page.goto('/empresas');

  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Software claro para operações/i })).toBeVisible();
  await expect(page.getByText(/A comunicação começa pelo problema da empresa/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Falar sobre requisitos' }).first()).toHaveAttribute('href', '/?tipo=empresa#contacto');
  await expect(page.getByRole('link', { name: 'Ver capacidades' })).toHaveAttribute('href', '#capacidades');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/empresas$/);
});

test('fundamentos empresariais aparecem sem claims de certificação ou SLA fixo', async ({ page }) => {
  await page.goto('/empresas');

  for (const heading of ['Descoberta e requisitos', 'Segurança e acessos', 'Qualidade e testes', 'Documentação e continuidade']) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }

  await expect(page.getByText(/ISO|SOC|24\/7|99,9%|uptime|garantia de segurança|garantido/i)).toHaveCount(0);
  await expect(page.getByText(/não são apresentadas certificações/i)).toBeVisible();
});

test('capacidades técnicas ficam colapsadas e abrem por detalhes progressivos', async ({ page }) => {
  await page.goto('/empresas');

  const capabilities = page.locator('#capacidades');
  await expect(capabilities.locator('details[open]')).toHaveCount(0);

  const security = capabilities.locator('details').filter({ hasText: 'Segurança e privacidade' });
  await security.locator('summary').click();
  await expect(security).toHaveAttribute('open', '');
  await expect(security.getByText('desenho orientado ao RGPD')).toBeVisible();

  const integrations = capabilities.locator('details').filter({ hasText: 'Integrações' });
  await integrations.locator('summary').click();
  await expect(integrations.getByText('APIs')).toBeVisible();
});

test('clareza comercial cobre escopo, propriedade, alojamento, suporte e transição', async ({ page }) => {
  await page.goto('/empresas');

  for (const heading of ['Escopo', 'Propriedade e licenciamento', 'Alojamento e dados', 'Suporte', 'Transição']) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }

  await expect(page.getByText(/O que será incluído, excluído e entregue/i)).toBeVisible();
  await expect(page.getByText(/Propriedade do código, componentes de terceiros/i)).toBeVisible();
  await expect(page.getByText(/Responsabilidade pelo alojamento/i)).toBeVisible();
  await expect(page.getByText(/expectativas de resposta são acordados/i)).toBeVisible();
  await expect(page.getByText(/transferência de conhecimento/i)).toBeVisible();
  await expect(page.getByText(/tempo de resposta:|resposta em [0-9]+ horas|SLA padrão/i)).toHaveCount(0);
});

test('CTA empresarial abre contacto com requisitos selecionados e preserva produto existente', async ({ page }) => {
  await page.goto('/empresas');

  await page.getByRole('link', { name: /Falar sobre requisitos/ }).first().click();
  await expect(page).toHaveURL(/\/\?tipo=empresa#contacto$/);
  await expect(page.getByLabel('Produto ou problema')).toHaveValue('Projeto empresarial / requisitos e integrações');

  await page.goto('/?produto=fieldops#contacto');
  await expect(page.getByLabel(/Produto de interesse/)).toHaveValue('Qevaryn FieldOps');
});
