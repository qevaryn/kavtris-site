import { expect, test } from '@playwright/test';

test('FieldOps carrega como conceito sem alegações de produto finalizado', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('heading', { name: /Organize equipas externas/i })).toBeVisible();
  await expect(page.getByText('Conceito de solução adaptável')).toBeVisible();
  await expect(page.getByText(/Esta demonstração apresenta uma possível configuração/i)).toBeVisible();
  await expect(page).toHaveTitle(/Qevaryn FieldOps \| Gestão de Equipas e Serviços Externos/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /organizar equipas externas/i);
  await expect(page.getByText(/clientes reais|app stores|SaaS completo|99,9%|garantido|Comprar agora|checkout|carrinho/i)).toHaveCount(0);
});

test('seletor de setores atualiza problema, fluxo e dashboard', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await page.getByRole('tab', { name: 'Limpeza' }).click();
  await expect(page.getByRole('tab', { name: 'Limpeza' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('Checklist de limpeza aberta')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Serviços por cliente' })).toBeVisible();

  await page.getByRole('tab', { name: 'Manutenção' }).click();
  await expect(page.getByRole('tab', { name: 'Manutenção' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('Técnico recebe a ordem de serviço')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Aprovações pendentes' })).toBeVisible();

  await page.getByRole('tab', { name: 'Hotelaria' }).click();
  await expect(page.getByText('Quarto ou área precisa de intervenção')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Estado de quartos' })).toBeVisible();

  await page.getByRole('tab', { name: 'Instalações técnicas' }).click();
  await expect(page.getByRole('heading', { name: 'Instalações por estado' })).toBeVisible();

  await page.getByRole('tab', { name: 'Equipas de inspeção' }).click();
  await expect(page.getByRole('heading', { name: 'Inspeções e ocorrências' })).toBeVisible();
});

test('workflow e estados mobile são interativos', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await page.getByRole('button', { name: /Check-in realizado/ }).click();
  await expect(page.getByRole('heading', { name: 'Check-in realizado' })).toBeVisible();
  await expect(page.getByText(/confirma presença no local/i)).toBeVisible();

  await page.getByRole('button', { name: 'Evidências', exact: true }).click();
  await expect(page.getByText('FieldOps Mobile')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Evidências', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText(/Fotografias e notas ligadas ao serviço/i)).toBeVisible();
});

test('QR Code, NFC, módulos e configurações preservam escopo honesto', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('heading', { name: /QR Code e NFC/i })).toBeVisible();
  await expect(page.getByText(/O software funciona sem equipamento especial/i)).toBeVisible();
  await expect(page.getByText(/não é vigilância permanente/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: /Comece pelo essencial/i })).toBeVisible();
  await expect(page.getByText(/Módulos disponíveis conforme o escopo/i)).toBeVisible();
  await expect(page.getByText(/não representam pacotes fechados ou preços fixos/i)).toBeVisible();
});

test('detalhes técnicos começam fechados e abrem por accordion', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  const technicalSection = page.locator('section').filter({ hasText: 'Detalhes técnicos para empresas e equipas de tecnologia' });
  await expect(technicalSection.locator('details[open]')).toHaveCount(0);

  const accessDetails = technicalSection.locator('details').filter({ hasText: 'Acesso e segurança' });
  await accessDetails.locator('summary').click();
  await expect(accessDetails).toHaveAttribute('open', '');
  await expect(accessDetails.getByText('desenho orientado ao RGPD')).toBeVisible();
});

test('CTAs de contacto mantêm FieldOps selecionado ou contacto geral', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await page.getByRole('link', { name: /Adaptar o FieldOps à minha empresa/i }).click();
  await expect(page).toHaveURL(/\/\?produto=fieldops#contacto$/);
  await expect(page.getByLabel(/Produto de interesse/)).toHaveValue('Qevaryn FieldOps');

  await page.goto('/produtos/fieldops');
  await page.getByRole('link', { name: 'Ainda não sei qual solução preciso' }).click();
  await expect(page).toHaveURL(/\/#contacto$/);
});

test('FieldOps não cria overflow horizontal no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/produtos/fieldops');

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);
  await expect(page.getByRole('heading', { name: /Organize equipas externas/i })).toBeVisible();
});
