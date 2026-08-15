import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';
import { revealWholePage } from '../shared/helpers/reveal';

/**
 * WEB.1F.6 — KAVTRIS UX/UI polish, product presentation and contextual
 * navigation.
 *
 *  - Homepage: right card refined (tinted surface, usable), technical link
 *    removed — EXACTLY two customer paths
 *  - Header: scrollspy — Como funciona/Contacto become active while their
 *    homepage sections are in view; route states preserved
 *  - Business discovery: EVERY selection scrolls to the starting point,
 *    content changes visibly, selected-card state, close restores the grid
 *  - Product details: "Voltar aos produtos" removed, product-specific visuals
 *    (hero mockup + workflow) on every product, primary CTA preserved
 *  - Engineering: final CTA on a light page surface, clearly separated from
 *    the deep-navy footer; /produtos selector also light
 */
test.describe('WEB.1F.6', () => {
  const headerNav = (page: import('@playwright/test').Page) =>
    page.getByRole('navigation', { name: 'Navegação principal' });

  const settle = (page: import('@playwright/test').Page, ms = 1100) => page.waitForTimeout(ms);

  const scrollSectionIntoBand = (page: import('@playwright/test').Page, id: string) =>
    page.evaluate((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) {
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, top - 100), behavior: 'instant' });
    }, id);

  test('home: cartão direito refinado — superfície tinted, utilizável, não-branca', async ({ page }) => {
    await page.goto('/');
    await settle(page, 500);

    const systemsCard = page.locator('#como-funciona').getByTestId('home-path-systems-secondary');
    await expect(systemsCard).toBeVisible();

    const bg = await systemsCard.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg, `right card should not be pure white (got ${bg})`).not.toBe('rgb(255, 255, 255)');
    expect(bg, `right card should not be the navy primary (got ${bg})`).not.toBe('rgb(3, 20, 38)');

    await expect(systemsCard.getByRole('link', { name: 'Ver todos os sistemas' })).toHaveAttribute(
      'href',
      '/produtos?modo=sistemas#catalogo'
    );
    await expect(systemsCard.getByRole('heading', { name: 'Ver os sistemas' })).toBeVisible();
  });

  test('home: exatamente dois caminhos — link técnico removido', async ({ page }) => {
    await page.goto('/');
    await settle(page, 500);

    const section = page.locator('#como-funciona');
    await expect(section.getByTestId('home-path-business-primary')).toBeVisible();
    await expect(section.getByTestId('home-path-systems-secondary')).toBeVisible();
    await expect(section.getByTestId('home-path-technical')).toHaveCount(0);
    await expect(section.getByText('Ver capacidades mais técnicas')).toHaveCount(0);
  });

  test('header: scrollspy — Como funciona e Contacto ativam por secção; rotas preservam estados', async ({ page }) => {
    await page.goto('/');
    await settle(page, 600);
    const nav = headerNav(page);

    // Topo → Início ativo.
    await expect(nav.getByRole('link', { name: 'Início', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Como funciona', exact: true })).not.toHaveAttribute('aria-current', 'true');

    // Dentro de #como-funciona → Como funciona ativo (e Início perde o estado).
    await scrollSectionIntoBand(page, 'como-funciona');
    await expect(nav.getByRole('link', { name: 'Como funciona', exact: true })).toHaveAttribute('aria-current', 'true');
    await expect(nav.getByRole('link', { name: 'Início', exact: true })).not.toHaveAttribute('aria-current', 'page');

    // Secção de contacto → Contacto ativo.
    await scrollSectionIntoBand(page, 'contacto');
    await expect(nav.getByRole('link', { name: 'Contacto', exact: true })).toHaveAttribute('aria-current', 'true');

    // Rotas continuam a mandar no estado ativo.
    await page.goto('/produtos');
    await expect(nav.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('aria-current', 'page');
    await page.goto('/empresas');
    await expect(nav.getByRole('link', { name: 'Engenharia', exact: true })).toHaveAttribute('aria-current', 'page');
    await page.goto('/sobre');
    await expect(nav.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('aria-current', 'page');
  });
  test('modo negócio: cada seleção rola para o ponto de partida, muda o conteúdo e marca o cartão', async ({ page }) => {
    await page.goto('/produtos?modo=negocio#tipos-de-negocio');
    await settle(page, 500);

    // 1.ª seleção — primeiro clique.
    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Barbearias e salões.');
    await expect(page.getByTestId('business-card-barbearias')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('business-card-barbearias')).toContainText('Ponto de partida aberto');

    // 2.ª seleção — painel aberto, voltamos à grelha e escolhemos outro negócio.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.getByTestId('business-card-restaurantes').click();
    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Restaurantes.');
    await expect(page.getByTestId('discovery-results')).toBeInViewport();
    await expect(page.getByTestId('business-card-restaurantes')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('business-card-barbearias')).toHaveAttribute('aria-pressed', 'false');

    // 3.ª seleção — mesmo painel, ainda sem fechar.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.getByTestId('business-card-hoteis').click();
    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Hotéis e alojamento.');
    await expect(page.getByTestId('discovery-results')).toBeInViewport();
    await expect(page.getByTestId('business-card-hoteis')).toHaveAttribute('aria-pressed', 'true');

    // Fechar restaura a grelha de negócios (DISCOVERY_CLOSE_RETURNS_HOME = NO).
    await page.getByTestId('discovery-close').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio/);
    await expect(page.getByTestId('business-card-restaurantes')).toBeVisible();
  });

  test('modo negócio: controles do painel separados e sem colisão (mobile incluído)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/produtos?modo=negocio&negocio=barbearias');
    await settle(page, 500);

    await expect(page.getByTestId('discovery-back-to-business')).toBeVisible();
    await expect(page.getByTestId('discovery-close')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('produto: sem "Voltar aos produtos", com visual específico e CTA primário preservado', async ({ page }) => {
    const products = [
      { slug: 'fieldops', flow: 'Serviço agendado', experience: true },
      { slug: 'stock-orders', flow: 'Produto registado', experience: false },
      { slug: 'hotel-operations', flow: 'Quarto atribuído', experience: false },
      { slug: 'kitchen-sync', flow: 'Pedido recebido', experience: false },
      { slug: 'kavtris-ops', flow: 'Pedido criado', experience: false },
      { slug: 'customer-portal', flow: 'Login do cliente', experience: false }
    ];

    for (const product of products) {
      await page.goto(`/produtos/${product.slug}`);
      await settle(page, 500);

      await expect(page.getByRole('link', { name: 'Voltar aos produtos', exact: true })).toHaveCount(0);
      await expect(page.getByRole('link', { name: /^Adaptar o .+ à minha empresa$/ }).first()).toBeVisible();

      if (product.experience) {
        await expect(page.locator('#fieldops-experience')).toBeVisible();
      } else {
        await expect(page.getByTestId('product-hero-visual')).toBeVisible();
        await expect(page.getByTestId('product-workflow-visual')).toBeVisible();
        await expect(page.getByTestId('product-workflow-visual')).toContainText(product.flow);
      }

      // WEB.1F.8 — the redundant mid-product conversion block is removed; the
      // final consultant escape remains as the closing fallback.
      await expect(page.getByText('Quer saber como o FieldOps funcionaria na sua empresa?')).toHaveCount(0);
      await expect(page.getByTestId('product-consultant-escape')).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  });

  test('engenharia: CTA final em superfície clara — visualmente separado do footer navy', async ({ page }) => {
    await page.goto('/empresas');
    await settle(page, 500);

    const finalSection = page.locator('main > section:last-of-type');
    await expect(finalSection.getByRole('heading', { name: 'Qual é o próximo passo para a sua empresa?' })).toBeVisible();

    const sectionBg = await finalSection.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(sectionBg, `final section should be light, got ${sectionBg}`).not.toBe('rgb(3, 20, 38)');

    const footerBg = await page.getByRole('contentinfo').evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(footerBg, `footer should be navy, got ${footerBg}`).toBe('rgb(3, 20, 38)');

    expect(sectionBg).not.toBe(footerBg);
  });

  test('produtos: seletor em superfície clara — não parece um footer expandido', async ({ page }) => {
    await page.goto('/produtos');
    await settle(page, 400);

    const selectorSection = page.locator('main > section');
    await expect(selectorSection.getByRole('heading', { name: 'Como prefere começar?' })).toBeVisible();

    const sectionBg = await selectorSection.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(sectionBg, `selector section should be light, got ${sectionBg}`).not.toBe('rgb(3, 20, 38)');

    const footerBg = await page.getByRole('contentinfo').evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(footerBg).toBe('rgb(3, 20, 38)');
  });

  test('responsive: sem overflow horizontal nas rotas tocadas (incluindo produto e móvel)', async ({ page }) => {
    const routes = [
      '/',
      '/produtos',
      '/produtos?modo=negocio',
      '/produtos?modo=negocio&negocio=barbearias',
      '/produtos?modo=sistemas',
      '/produtos/customer-portal',
      '/produtos/fieldops',
      '/empresas'
    ];
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(route);
        await expectNoHorizontalOverflow(page);
      }
    }
  });

  test('axe: zero violações graves/críticas nas rotas refinadas', async ({ page }) => {
    const routes = [
      '/',
      '/produtos',
      '/produtos?modo=negocio',
      '/produtos?modo=negocio&negocio=barbearias',
      '/produtos?modo=sistemas',
      '/produtos/customer-portal',
      '/produtos/stock-orders',
      '/produtos/fieldops',
      '/empresas',
      '/empresas#capacidades'
    ];
    for (const route of routes) {
      await page.goto(route);
      await settle(page, 700);
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

