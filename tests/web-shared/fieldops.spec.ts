import { expect, test } from '@playwright/test';

test('FieldOps carrega como conceito com CTAs e aviso honesto', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  await expect(page.getByRole('heading', { name: /Organize equipas externas/i })).toBeVisible();
  await expect(page.getByText('Conceito de solução adaptável')).toBeVisible();
  await expect(page.getByText(/Esta apresentação mostra uma possível configuração/i)).toBeVisible();
  await expect(page).toHaveTitle(/FieldOps \| Gestão de Equipas e Serviços Externos/);
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

test('nível selecionado na página sincroniza os módulos e o resultado da demonstração', async ({ page }) => {
  await page.goto('/produtos/fieldops');

  // Default = Essencial (page-level single source of truth).
  await expect(page.getByTestId('product-level-option-essential')).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('Nível Essencial');
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('Organizar serviços e reduzir informação perdida');

  // Crescimento muda a demonstração sem criar outro seletor de nível.
  await page.getByTestId('product-level-option-growth').click();
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('Nível Crescimento');
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('QR Code ou NFC');
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('Acompanhar equipas e manter responsabilidades');

  // Empresarial idem.
  await page.getByTestId('product-level-option-enterprise').click();
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('Nível Empresarial');
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('histórico de auditoria');
  await expect(page.getByTestId('fieldops-demo-config')).toContainText('Integrar a operação e criar controlo');

  // Os níveis não são pacotes fechados nem têm preços.
  await expect(page.getByText(/Comprar|checkout|carrinho|preço mensal|€/i)).toHaveCount(0);
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

  await page.getByRole('link', { name: /^Adaptar o Essencial à minha empresa$/ }).first().click();
  await expect(page).toHaveURL(/\/\?produto=fieldops#contacto$/);
  await expect(page.getByLabel(/Produto de interesse/)).toHaveValue('FieldOps');

  await page.goto('/produtos/fieldops');
  await page.getByTestId('product-consultant-escape').getByRole('link', { name: 'Falar com um consultor' }).click();
  await expect(page).toHaveURL(/\/#contacto$/);
});
