import { expect, test } from '@playwright/test';

test('FieldOps carrega como conceito com CTAs e aviso honesto', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('heading', { name: /Organize equipas externas/i })).toBeVisible();
  await expect(page.getByText('Conceito de solução adaptável')).toBeVisible();
  await expect(page.getByText(/Esta apresentação mostra uma possível configuração/i)).toBeVisible();
  await expect(page).toHaveTitle(/Qevaryn FieldOps \| Gestão de Equipas e Serviços Externos/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /organizar equipas externas/i);
  await expect(page.getByText(/clientes reais|app stores|SaaS completo|99,9%|garantido|Comprar agora|checkout|carrinho/i)).toHaveCount(0);

  const heroImage = page.getByRole('img', { name: /agenda mobile, check-in e estado de serviços externos/i });
  await expect(heroImage).toBeVisible();
  await expect.poll(async () => heroImage.evaluate((image: HTMLImageElement) => (
    image.complete &&
    image.naturalWidth > 0 &&
    image.naturalHeight > 0 &&
    image.currentSrc.includes('qevaryn-fieldops.webp')
  ))).toBe(true);

  await page.getByRole('link', { name: 'Ver como funciona' }).click();
  await expect(page).toHaveURL(/#fieldops-experience$/);
  await expect(page.getByRole('heading', { name: 'Veja o FieldOps em funcionamento' })).toBeInViewport();
});

test('experiência central alterna entre gestão, equipa e processo', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('tab', { name: 'Gestão', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Painel para acompanhar serviços e prioridades' })).toBeVisible();
  await expect(page.getByText('Aprovações', { exact: true })).toBeVisible();

  await page.getByRole('tab', { name: 'Equipa', exact: true }).click();
  await expect(page.getByRole('tab', { name: 'Equipa', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('FieldOps Mobile')).toBeVisible();
  await expect(page.getByText(/Fotografias e notas ligadas ao serviço/i)).toBeVisible();

  await page.getByRole('tab', { name: 'Processo', exact: true }).click();
  await expect(page.getByRole('tab', { name: 'Processo', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('Serviço criado')).toBeVisible();
  await expect(page.getByText('Relatório disponível')).toBeVisible();
});

test('abas da experiência suportam navegação por teclado', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await page.getByRole('tab', { name: 'Gestão', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Equipa', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Processo', exact: true })).toHaveAttribute('aria-selected', 'true');
});

test('setor selecionado mostra apenas problema, fluxo, módulos e resultado desse contexto', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await page.getByRole('tab', { name: 'Limpeza' }).click();
  await expect(page.getByRole('tab', { name: 'Limpeza' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('Localização recebida')).toBeVisible();
  await expect(page.getByText(/Serviços recorrentes ficam mais fáceis/i)).toBeVisible();

  await page.getByRole('tab', { name: 'Manutenção' }).click();
  await expect(page.getByRole('tab', { name: 'Manutenção' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('Ordem recebida')).toBeVisible();
  await expect(page.getByText(/Ordens, materiais, histórico e evidências/i)).toBeVisible();
  await expect(page.getByText('Localização recebida')).toHaveCount(0);

  await page.getByRole('tab', { name: 'Hotelaria' }).click();
  await expect(page.getByText('Área disponível')).toBeVisible();

  await page.getByRole('tab', { name: 'Cuidados domiciliários' }).click();
  await expect(page.getByText(/sem transformar o software em ferramenta clínica regulada/i)).toBeVisible();

  await page.getByRole('tab', { name: 'Transportes e entregas' }).click();
  await expect(page.getByText('Prova de entrega')).toBeVisible();
});

test('seletor de evolução altera módulos e resultado sem apresentar preços fixos', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('tab', { name: 'Essencial' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText(/Organizar serviços e reduzir informação perdida/i)).toBeVisible();

  await page.getByRole('tab', { name: 'Crescimento' }).click();
  await expect(page.getByText('QR Code ou NFC')).toBeVisible();
  await expect(page.getByText(/Acompanhar equipas e manter responsabilidades/i)).toBeVisible();

  await page.getByRole('tab', { name: 'Empresarial' }).click();
  await expect(page.getByText('histórico de auditoria')).toBeVisible();
  await expect(page.getByText(/Integrar a operação e criar controlo/i)).toBeVisible();
  await expect(page.getByText(/não representam pacotes fechados ou preços fixos/i)).toBeVisible();
  await expect(page.getByText(/Comprar|checkout|carrinho|preço mensal/i)).toHaveCount(0);
});

test('equipamentos opcionais preservam foco em software e privacidade', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('heading', { name: 'Confirmação simples no local' })).toBeVisible();
  await expect(page.getByText(/O software funciona sem equipamento especial/i)).toBeVisible();
  await expect(page.getByText(/QR Code ou uma etiqueta NFC pode abrir a tarefa correta/i)).toBeVisible();
  await expect(page.getByText(/não é vigilância permanente/i)).toBeVisible();
  await expect(page.getByText(/a KAVTRIS não fabrica estes dispositivos/i)).toBeVisible();
});

test('detalhes técnicos começam fechados e abrem por accordion', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  const technicalSection = page.locator('section').filter({ hasText: 'Detalhes técnicos para empresas e equipas de tecnologia' });
  await expect(technicalSection.locator('details[open]')).toHaveCount(0);

  const securityDetails = technicalSection.locator('details').filter({ hasText: 'Segurança' });
  await securityDetails.locator('summary').click();
  await expect(securityDetails).toHaveAttribute('open', '');
  await expect(securityDetails.getByText('desenho orientado ao RGPD')).toBeVisible();
  await expect(technicalSection.getByText(/A arquitetura e os controlos finais são definidos/i)).toBeVisible();
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
