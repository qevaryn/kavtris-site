import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';
import { revealWholePage } from '../shared/helpers/reveal';

/**
 * WEB.1F.5 — KAVTRIS Public Journey Simplification, Product Entry Modes
 * & Engineering Routing.
 *
 *  - Header: "Como funciona" / "Engenharia" (Serviços removed); active states
 *  - Homepage: simplified architecture, customer-path selector (two cards +
 *    technical third path), old sections removed
 *  - /produtos: mode selector default; business/system mode isolation; URL is
 *    the canonical state; refresh + deep links; invalid-mode fallback
 *  - Business discovery: heading, consultant help, starting point close
 *    (✕ Fechar == ← Voltar aos tipos de negócio) staying in business mode
 *  - System catalog: functional filters (no business-sector filters),
 *    consultant help, change-search-method
 *  - Engineering: public label Engenharia, #capacidades anchor, final
 *    three-path section with consultant PRIMARY
 *  - About CTA terminology
 *  - Browser history + scroll/focus restoration + responsive + axe
 */
test.describe('WEB.1F.5', () => {
  const headerNav = (page: import('@playwright/test').Page) =>
    page.getByRole('navigation', { name: 'Navegação principal' });

  const settle = (page: import('@playwright/test').Page, ms = 1100) => page.waitForTimeout(ms);

  test('header: ordem final e rótulos (Engenharia substitui Serviços) com estado ativo exclusivo', async ({ page }) => {
    await page.goto('/');
    const nav = headerNav(page);

    const labels = await nav.locator('a').allTextContents();
    expect(labels.map((label) => label.trim()).join(' | ')).toBe(
      'Início | Como funciona | Produtos | Engenharia | Sobre | Contacto'
    );

    await expect(nav.getByRole('link', { name: 'Como funciona', exact: true })).toHaveAttribute('href', '/#como-funciona');
    await expect(nav.getByRole('link', { name: 'Engenharia', exact: true })).toHaveAttribute('href', '/empresas');
    await expect(nav.getByRole('link', { name: 'Serviços', exact: true })).toHaveCount(0);

    await expect(nav.getByRole('link', { name: 'Início', exact: true })).toHaveAttribute('aria-current', 'page');

    await page.goto('/produtos');
    await expect(nav.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('aria-current', 'page');

    await page.goto('/empresas');
    await expect(nav.getByRole('link', { name: 'Engenharia', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Produtos', exact: true })).not.toHaveAttribute('aria-current', 'page');

    await page.goto('/sobre');
    await expect(nav.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('aria-current', 'page');
  });

  test('footer: terminologia Engenharia e destinos alinhados com o Header', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');

    await expect(footer.getByRole('link', { name: 'Início', exact: true })).toHaveAttribute('href', '/#inicio');
    await expect(footer.getByRole('link', { name: 'Como funciona', exact: true })).toHaveAttribute('href', '/#como-funciona');
    await expect(footer.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('href', '/produtos');
    await expect(footer.getByRole('link', { name: 'Engenharia', exact: true })).toHaveAttribute('href', '/empresas');
    await expect(footer.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('href', '/sobre');
    await expect(footer.getByRole('link', { name: 'Contacto', exact: true })).toHaveAttribute('href', '/#contacto');
    await expect(footer.getByRole('link', { name: 'Política de Privacidade', exact: true })).toHaveAttribute('href', '/privacy');
    await expect(footer.getByRole('link', { name: 'Serviços', exact: true })).toHaveCount(0);
  });

  test('home: arquitetura simplificada sem secções antigas e sem carrosséis', async ({ page }) => {
    await page.goto('/');
    await settle(page, 500);

    const ids = ['inicio', 'como-funciona', 'rede', 'contacto', 'significado'];
    const boxes = [];
    for (const id of ids) {
      const box = await page.locator(`#${id}`).boundingBox();
      expect(box, `section #${id} should be laid out`).not.toBeNull();
      boxes.push(box!.y);
    }
    for (let i = 1; i < boxes.length; i += 1) {
      expect(boxes[i]).toBeGreaterThanOrEqual(boxes[i - 1]);
    }

    await expect(page.locator('#como-trabalhamos')).toHaveCount(0);
    await expect(page.locator('#produtos-preview')).toHaveCount(0);
    await expect(page.locator('#empresas')).toHaveCount(0);
    await expect(page.getByTestId('featured-products-carousel')).toHaveCount(0);
    await expect(page.getByTestId('process-carousel')).toHaveCount(0);
    await expect(page.getByTestId('enterprise-capabilities-carousel')).toHaveCount(0);

    await expect(page.getByRole('button', { name: /Barbearias e salões/i })).toHaveCount(0);
    await expect(page.getByTestId('services-ticker').getByText('Reduzir tarefas manuais').first()).toBeVisible();
  });

  test('home: Como funciona com exatamente dois cartões e sem terceiro caminho técnico', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#como-funciona');
    await expect(section.getByRole('heading', { name: 'Comece pelo caminho mais simples para a sua empresa.' })).toBeVisible();

    const businessCard = section.getByTestId('home-path-business-primary');
    await expect(businessCard.getByText('Não sei qual sistema preciso', { exact: false })).toBeVisible();
    await expect(businessCard.getByRole('link', { name: 'Escolher pelo meu negócio' })).toHaveAttribute(
      'href',
      '/produtos?modo=negocio'
    );

    const systemsCard = section.getByTestId('home-path-systems-secondary');
    await expect(systemsCard.getByText('Já sei o que procuro', { exact: false })).toBeVisible();
    await expect(systemsCard.getByRole('link', { name: 'Ver todos os sistemas' })).toHaveAttribute(
      'href',
      '/produtos?modo=sistemas#catalogo'
    );

    // WEB.1F.6 — exactly two customer paths (HOME_MODE_CHOICES = 2).
    await expect(section.getByTestId('home-path-technical')).toHaveCount(0);
    await expect(section.getByText('Ver capacidades mais técnicas')).toHaveCount(0);
  });

  test('home journey A: "Escolher pelo meu negócio" abre o modo negócio no topo da página', async ({ page }) => {
    await page.goto('/');
    await page.locator('#como-funciona').getByRole('link', { name: 'Escolher pelo meu negócio' }).click();

    await expect(page).toHaveURL(/\/produtos\?modo=negocio$/);
    // NORMAL_BUSINESS_ENTRY_STARTS_AT_TOP — the hero (not the grid anchor) is
    // the first thing the visitor sees.
    await expect(page.getByRole('heading', { name: 'Descubra sistemas a partir do contexto da sua empresa.' })).toBeInViewport();
    await expect(page.getByTestId('business-card-barbearias')).toBeVisible();
    await expect(page.getByTestId('products-mode-business-primary')).toHaveCount(0);
  });

  test('home journey B: "Ver todos os sistemas" abre o modo sistemas sem repetir o seletor', async ({ page }) => {
    await page.goto('/');
    await page.locator('#como-funciona').getByRole('link', { name: 'Ver todos os sistemas' }).click();

    await expect(page).toHaveURL(/\/produtos\?modo=sistemas#catalogo/);
    await expect(page.getByTestId('product-card').first()).toBeVisible();
    await expect(page.getByTestId('products-mode-systems-secondary')).toHaveCount(0);
  });

  // WEB.1F.6 — the third technical path was REMOVED from the homepage. Technical
  // visitors reach capabilities through Header → Engenharia (covered above), so
  // there is no "home journey C" anymore.

  test('produtos default: apenas o seletor de modo é apresentado', async ({ page }) => {
    await page.goto('/produtos');
    await settle(page, 500);

    await expect(page.getByRole('heading', { name: 'Como prefere começar?' })).toBeVisible();
    await expect(page.getByTestId('products-mode-business-primary')).toBeVisible();
    await expect(page.getByTestId('products-mode-systems-secondary')).toBeVisible();

    await expect(page.getByTestId('business-card-barbearias')).toHaveCount(0);
    await expect(page.getByTestId('product-card')).toHaveCount(0);
    await expect(page.getByTestId('catalog-filters')).toHaveCount(0);
  });

  test('produtos default: cartões do seletor abrem os respetivos modos', async ({ page }) => {
    await page.goto('/produtos');
    await page.getByTestId('products-mode-business-primary').getByRole('link', { name: 'Escolher pelo meu negócio' }).click();
    await expect(page).toHaveURL(/\/produtos\?modo=negocio$/);
    await expect(page.getByTestId('business-card-barbearias')).toBeVisible();

    await page.goto('/produtos');
    await page.getByTestId('products-mode-systems-secondary').getByRole('link', { name: 'Ver todos os sistemas' }).click();
    await expect(page).toHaveURL(/\/produtos\?modo=sistemas#catalogo/);
    await expect(page.getByTestId('product-card').first()).toBeVisible();
  });

  test('modo negócio: isolamento — sem catálogo, com ajuda de consultor e mudança de método', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 400);

    await expect(page.getByText('Qual é o seu negócio?', { exact: false }).first()).toBeVisible();
    await expect(page.getByTestId('business-card-barbearias')).toBeVisible();

    await expect(page.getByTestId('product-card')).toHaveCount(0);
    await expect(page.getByTestId('catalog-filters')).toHaveCount(0);

    const changeMethod = page.getByTestId('business-change-search-method');
    await expect(changeMethod).toHaveAttribute('href', '/produtos');

    const help = page.getByTestId('business-help-consultant');
    await expect(help.getByRole('heading', { name: 'Não encontrou o seu tipo de negócio?' })).toBeVisible();
    await expect(help.getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');
  });

  test('modo negócio: ponto de partida abre e ✕ Fechar devolve a grelha de negócios', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 500);

    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await expect(page).toHaveURL(/modo=negocio&negocio=barbearias/);

    await page.getByTestId('discovery-close').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio/);
    await expect(page).not.toHaveURL(/negocio=/);
    await expect(page.getByText('Qual é o seu negócio?', { exact: false }).first()).toBeVisible();
    await expect(page.getByTestId('business-card-barbearias')).toBeVisible();
  });

  test('modo negócio: "← Voltar aos tipos de negócio" tem exatamente o mesmo comportamento', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 500);

    await page.getByTestId('business-card-restaurantes').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    await page.getByTestId('discovery-back-to-business').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio/);
    await expect(page.getByText('Qual é o seu negócio?', { exact: false }).first()).toBeVisible();
    await expect(page.getByTestId('business-card-restaurantes')).toBeVisible();
  });

  test('ponto de partida: inclui ajuda de consultor para nunca ser um beco sem saída', async ({ page }) => {
    await page.goto('/produtos?modo=negocio&negocio=barbearias');
    await settle(page, 500);

    await expect(page.getByTestId('discovery-results')).toBeVisible();
    const consultant = page.getByTestId('starting-point-consultant');
    await expect(consultant.getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');
    await expect(consultant.getByText('Nenhuma destas opções parece certa?')).toBeVisible();
  });

  test('modo sistemas: isolamento e filtros funcionais (sem filtros de setor de negócio)', async ({ page }) => {
    await page.goto('/produtos?modo=sistemas');
    await settle(page, 400);

    await expect(page.getByTestId('product-card').first()).toBeVisible();
    await expect(page.getByTestId('catalog-filters')).toBeVisible();

    await expect(page.getByTestId('business-card-barbearias')).toHaveCount(0);
    await expect(page.getByTestId('business-help-consultant')).toHaveCount(0);

    const filters = page.getByTestId('catalog-filters');
    for (const label of ['Todos', 'Operações', 'Gestão', 'Stock e pedidos', 'Equipas', 'Clientes']) {
      await expect(filters.getByRole('button', { name: label, exact: true })).toBeVisible();
    }
    for (const businessLabel of ['Hotelaria', 'Restauração', 'Retalho', 'Barbearias']) {
      await expect(filters.getByRole('button', { name: businessLabel, exact: true })).toHaveCount(0);
    }

    await expect(page.getByTestId('systems-change-search-method')).toHaveAttribute('href', '/produtos');

    const consultant = page.getByTestId('systems-consultant');
    await expect(consultant.getByRole('heading', { name: 'Não encontrou o sistema que procura?' })).toBeVisible();
    await expect(consultant.getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');
  });

  test('modo sistemas: filtro funcional atualiza os cartões visíveis', async ({ page }) => {
    await page.goto('/produtos?modo=sistemas');

    const catalog = page.locator('#catalogo');
    await catalog.getByRole('button', { name: 'Stock e pedidos', exact: true }).click();
    await expect(catalog.getByRole('button', { name: 'Stock e pedidos', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('heading', { name: 'Stock & Orders', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'FieldOps', exact: true })).toHaveCount(0);

    await catalog.getByRole('button', { name: 'Clientes', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Customer Portal', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stock & Orders', exact: true })).toHaveCount(0);

    await catalog.getByRole('button', { name: 'Todos', exact: true }).click();
    await expect(page.getByTestId('product-card')).toHaveCount(6);
  });

  test('engenharia: label público, âncora #capacidades e três caminhos finais (consultor primário)', async ({ page }) => {
    await page.goto('/empresas');

    await expect(page.getByRole('heading', { name: /Tecnologia adaptada à realidade da sua empresa/ })).toBeVisible();
    await expect(page.getByText('Engenharia', { exact: true }).first()).toBeVisible();

    await page.goto('/empresas#capacidades');
    await expect(page.locator('#capacidades')).toBeInViewport();

    const finalSection = page.locator('main > section:last-of-type');
    await expect(finalSection.getByRole('heading', { name: 'Qual é o próximo passo para a sua empresa?' })).toBeVisible();

    const consultant = page.getByTestId('engineering-final-consultant');
    await expect(consultant.getByRole('heading', { name: 'Falar com um consultor' })).toBeVisible();
    await expect(consultant.getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');

    await expect(page.getByTestId('engineering-final-business').getByRole('link', { name: 'Encontrar pelo meu negócio' })).toHaveAttribute(
      'href',
      '/produtos?modo=negocio'
    );
    await expect(page.getByTestId('engineering-final-systems').getByRole('link', { name: 'Ver todos os sistemas' })).toHaveAttribute(
      'href',
      '/produtos?modo=sistemas#catalogo'
    );

    const consultantBg = await consultant.evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(consultantBg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('sobre: CTA final usa a terminologia "Ver como funciona"', async ({ page }) => {
    await page.goto('/sobre');
    await expect(page.getByRole('link', { name: 'Ver como funciona' })).toHaveAttribute('href', '/#como-funciona');
    await expect(page.getByRole('link', { name: 'Falar com a KAVTRIS' })).toHaveAttribute('href', '/#contacto');
  });

  test('estado URL: refresh e entradas diretas preservam o modo', async ({ page }) => {
    await page.goto('/produtos?modo=negocio&negocio=barbearias');
    await settle(page, 500);
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await page.reload();
    await settle(page, 600);
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    await page.goto('/produtos?modo=sistemas');
    await settle(page, 400);
    await expect(page.getByTestId('product-card').first()).toBeVisible();
    await page.reload();
    await expect(page.getByTestId('product-card').first()).toBeVisible();
  });

  test('fallback: modo inválido volta ao seletor sem conteúdo vazio', async ({ page }) => {
    await page.goto('/produtos?modo=desconhecido');
    await settle(page, 400);

    await expect(page.getByRole('heading', { name: 'Como prefere começar?' })).toBeVisible();
    await expect(page.getByTestId('products-mode-business-primary')).toBeVisible();
  });

  test('histórico: Home → modo negócio → ponto de partida → Contacto; Back restaura contexto', async ({ page }) => {
    await page.goto('/');
    await settle(page, 500);
    await page.locator('#como-funciona').getByRole('link', { name: 'Escolher pelo meu negócio' }).click();
    await expect(page).toHaveURL(/modo=negocio/);
    await settle(page, 600);

    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await settle(page, 400);

    await page.getByTestId('starting-point-consultant').getByRole('link', { name: 'Falar com um consultor' }).click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator('#contacto')).toBeInViewport();

    await page.goBack();
    await settle(page, 900);
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    await page.goBack();
    await settle(page, 900);
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/modo=negocio/);
    await expect(page.getByTestId('business-card-barbearias')).toBeVisible();

    await page.goBack();
    await settle(page, 900);
    await expect(page.locator('#como-funciona')).toBeVisible();
  });

  test('foco: fechar o ponto de partida devolve o foco ao cartão de origem', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 500);

    await page.getByTestId('business-card-barbearias').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio/);
    await expect(page.getByTestId('business-card-barbearias')).toBeFocused();
  });

  test('responsive: sem overflow horizontal nas rotas principais', async ({ page }) => {
    const routes = ['/', '/produtos', '/produtos?modo=negocio', '/produtos?modo=sistemas', '/empresas', '/sobre'];
    for (const width of [320, 390, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(route);
        await expectNoHorizontalOverflow(page);
      }
    }
  });

  test('axe: zero violações graves/críticas nas rotas públicas', async ({ page }) => {
    const routes = [
      '/',
      '/produtos',
      '/produtos?modo=negocio',
      '/produtos?modo=negocio&negocio=barbearias',
      '/produtos?modo=sistemas',
      '/empresas',
      '/empresas#capacidades',
      '/sobre'
    ];
    for (const route of routes) {
      await page.goto(route);
      await settle(page, 700);
      // Only the homepage wraps sections in the one-time scroll reveal; scan it
      // revealed so axe audits the final visible state (footer included).
      if (route === '/') {
        await revealWholePage(page);
      }
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const seriousOrCritical = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(seriousOrCritical, `axe violations on ${route}`).toEqual([]);
    }
  });
});
