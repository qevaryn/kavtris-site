import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';
import { revealWholePage } from '../shared/helpers/reveal';

/**
 * WEB.1F.7 — product persuasion, visual configurator and final UX polish.
 *
 *  - Homepage secondary card: dark KAVTRIS navy contour + strong CTA outline,
 *    still clickable, exactly 2 mode choices, technical link absent
 *  - Visual level configurator on EVERY product: Essencial/Crescimento/
 *    Empresarial; default Essencial; selected state, product visual
 *    (data-product-level) and summary all change; keyboard navigation
 *  - Consultant escape path on every product → /#contacto
 *  - Point-of-start shared spacing: top actions independent, badge no longer
 *    collides with the CTA, no horizontal overflow on mobile
 *  - axe serious/critical = 0 on every product route
 */
test.describe('WEB.1F.7', () => {
  const settle = (page: import('@playwright/test').Page, ms = 500) => page.waitForTimeout(ms);

  const productSlugs = [
    'fieldops',
    'stock-orders',
    'hotel-operations',
    'kitchen-sync',
    'kavtris-ops',
    'customer-portal'
  ];

  test('home: cartão secundário com contorno navy escuro e CTA com contorno forte — permanece clicável', async ({
    page
  }) => {
    await page.goto('/');
    await settle(page, 500);

    const systemsCard = page.locator('#como-funciona').getByTestId('home-path-systems-secondary');
    await expect(systemsCard).toBeVisible();

    // WEB.1F.7 — dark navy contour instead of the old blue-tinted border.
    const borderColor = await systemsCard.evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(borderColor, `card border should be dark navy (got ${borderColor})`).toMatch(/rgba\(7,\s*31,\s*53/);

    // The CTA keeps its light surface but gains a strong dark outline.
    const cta = systemsCard.getByRole('link', { name: 'Ver todos os sistemas' });
    await expect(cta).toHaveAttribute('href', '/produtos?modo=sistemas#catalogo');
    const ctaShadow = await cta.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(ctaShadow, `CTA ring should contain the dark navy contour (got ${ctaShadow})`).toContain(
      'rgba(3, 20, 38, 0.5)'
    );

    // Still fully clickable.
    await cta.click();
    await expect(page).toHaveURL(/\/produtos\?modo=sistemas#catalogo/);
  });

  test('home: exatamente 2 caminhos — link técnico continua ausente', async ({ page }) => {
    await page.goto('/');
    await settle(page, 500);

    const section = page.locator('#como-funciona');
    await expect(section.getByTestId('home-path-business-primary')).toBeVisible();
    await expect(section.getByTestId('home-path-systems-secondary')).toBeVisible();
    await expect(section.getByTestId('home-path-technical')).toHaveCount(0);
    await expect(section.getByText('Ver capacidades mais técnicas')).toHaveCount(0);
  });

  test('configurador (Customer Portal): default Essencial; Crescimento/Empresarial mudam estado, visual e resumo; retorno restaura', async ({
    page
  }) => {
    await page.goto('/produtos/customer-portal');
    await settle(page, 600);

    const visual = page.getByTestId('product-level-visual');
    const summary = page.getByTestId('product-level-summary');
    const optionEssential = page.getByTestId('product-level-option-essential');
    const optionGrowth = page.getByTestId('product-level-option-growth');
    const optionEnterprise = page.getByTestId('product-level-option-enterprise');

    // Default = Essencial.
    await expect(optionEssential).toHaveAttribute('aria-checked', 'true');
    await expect(optionGrowth).toHaveAttribute('aria-checked', 'false');
    await expect(visual).toHaveAttribute('data-product-level', 'essential');
    await expect(summary).toContainText('Essencial selecionado');

    // Crescimento: selected state + visual + summary all change.
    await optionGrowth.click();
    await expect(optionGrowth).toHaveAttribute('aria-checked', 'true');
    await expect(optionEssential).toHaveAttribute('aria-checked', 'false');
    await expect(visual).toHaveAttribute('data-product-level', 'growth');
    await expect(summary).toContainText('Crescimento selecionado');
    await expect(visual).toContainText('Pagamento');
    await expect(visual).not.toContainText('login de cliente');

    // Empresarial: grows again (integration bar appears).
    await optionEnterprise.click();
    await expect(optionEnterprise).toHaveAttribute('aria-checked', 'true');
    await expect(visual).toHaveAttribute('data-product-level', 'enterprise');
    await expect(summary).toContainText('Empresarial selecionado');
    await expect(visual).toContainText('Integrações por API');
    await expect(visual).toContainText('histórico do cliente');

    // Return to Essencial restores state, visual and summary.
    await optionEssential.click();
    await expect(optionEssential).toHaveAttribute('aria-checked', 'true');
    await expect(optionEnterprise).toHaveAttribute('aria-checked', 'false');
    await expect(visual).toHaveAttribute('data-product-level', 'essential');
    await expect(summary).toContainText('Essencial selecionado');
    await expect(visual).toContainText('login de cliente');
  });

  test('configurador: navegação por teclado muda o nível (ArrowDown/ArrowUp/Home)', async ({ page }) => {
    await page.goto('/produtos/customer-portal');
    await settle(page, 600);

    const optionEssential = page.getByTestId('product-level-option-essential');
    const optionGrowth = page.getByTestId('product-level-option-growth');
    const optionEnterprise = page.getByTestId('product-level-option-enterprise');

    await optionEssential.focus();
    await page.keyboard.press('ArrowDown');
    await expect(optionGrowth).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('ArrowDown');
    await expect(optionEnterprise).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('ArrowUp');
    await expect(optionGrowth).toHaveAttribute('aria-checked', 'true');

    await page.keyboard.press('Home');
    await expect(optionEssential).toHaveAttribute('aria-checked', 'true');
  });

  test('configurador: todos os produtos têm 3 níveis e o visual muda com a seleção', async ({ page }) => {
    for (const slug of productSlugs) {
      await page.goto(`/produtos/${slug}`);
      await settle(page, 500);

      await expect(page.getByTestId('product-level-option-essential')).toBeVisible();
      await expect(page.getByTestId('product-level-option-growth')).toBeVisible();
      await expect(page.getByTestId('product-level-option-enterprise')).toBeVisible();

      const visual = page.getByTestId('product-level-visual');
      await expect(visual).toHaveAttribute('data-product-level', 'essential');

      await page.getByTestId('product-level-option-growth').click();
      await expect(visual).toHaveAttribute('data-product-level', 'growth');

      await page.getByTestId('product-level-option-enterprise').click();
      await expect(visual).toHaveAttribute('data-product-level', 'enterprise');

      await page.getByTestId('product-level-option-essential').click();
      await expect(visual).toHaveAttribute('data-product-level', 'essential');
    }
  });

  test('produtos: sem preços, sem checkout — apenas níveis de adoção e CTA de adaptação', async ({ page }) => {
    await page.goto('/produtos/customer-portal');
    await settle(page, 500);

    await expect(page.getByText(/€|preço mensal|comprar agora|checkout|carrinho|assinatura mensal/i)).toHaveCount(0);

    const configurator = page.getByTestId('product-level-configurator');
    await expect(configurator.getByText('A composição final é definida de acordo com a sua operação.')).toBeVisible();
    await expect(configurator.getByRole('link', { name: 'Adaptar o Essencial à minha empresa' })).toHaveAttribute(
      'href',
      '/?produto=customer-portal#contacto'
    );
  });


  test('consultor: escape presente em todas as páginas de produto e navega para /#contacto', async ({ page }) => {
    for (const slug of productSlugs) {
      await page.goto(`/produtos/${slug}`);
      await settle(page, 400);

      const escape = page.getByTestId('product-consultant-escape');
      await expect(escape).toBeVisible();
      await expect(escape.getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');
    }

    // Navegação representativa.
    await page.goto('/produtos/customer-portal');
    await settle(page, 400);
    await page.getByTestId('product-consultant-escape').getByRole('link', { name: 'Falar com um consultor' }).click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test('ponto de partida: ações superiores independentes e sem colisão com CTA (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/produtos?modo=negocio&negocio=barbearias');
    await settle(page, 600);

    const back = page.getByTestId('discovery-back-to-business');
    const close = page.getByTestId('discovery-close');
    await expect(back).toBeVisible();
    await expect(close).toBeVisible();

    // Stop the panel's smooth scroll so the measurements come from a stable
    // frame, then read both geometries in ONE evaluate (consistent snapshot).
    await page.evaluate(() => {
      document.querySelector('[data-testid="discovery-results"]')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(300);

    const gaps = await page.evaluate(() => {
      const topActions = Array.from(document.querySelectorAll('[data-testid="discovery-back-to-business"], [data-testid="discovery-close"]')).map(
        (el) => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        }
      );
      const badge = Array.from(document.querySelectorAll('span')).find((el) => el.textContent?.trim() === 'Pode ser adaptado');
      const cta = Array.from(document.querySelectorAll('a')).find((a) => a.textContent?.includes('Ver produto'));
      let actionGap = 0;
      let cardGap = 0;
      if (topActions.length === 2) {
        const [a, b] = topActions;
        const sameRow = a.y < b.y + b.height && b.y < a.y + a.height;
        actionGap = sameRow ? Math.abs(b.x - (a.x + a.width)) : Math.abs(b.y - (a.y + a.height));
      }
      if (badge && cta) {
        const b = badge.getBoundingClientRect();
        const c = cta.getBoundingClientRect();
        cardGap = c.top - b.bottom;
      }
      return { actionGap, cardGap };
    });

    // The two top actions are clearly separated (never two halves of one control).
    expect(gaps.actionGap, `top actions gap should be >= 12px, got ${gaps.actionGap}`).toBeGreaterThanOrEqual(12);

    // Inside a product card the "Pode ser adaptado" badge must not collide
    // with the "Ver produto" CTA.
    expect(gaps.cardGap, `badge->CTA gap should be >= 16px, got ${gaps.cardGap}`).toBeGreaterThanOrEqual(16);

    await expectNoHorizontalOverflow(page);
  });

  test('ponto de partida: fluxo partilhado preservado (seleção repetida + fecho)', async ({ page }) => {
    await page.goto('/produtos?modo=negocio&negocio=barbearias');
    await settle(page, 500);

    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Barbearias e salões.');
    await expect(page.getByTestId('business-card-barbearias')).toHaveAttribute('aria-pressed', 'true');

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.getByTestId('business-card-restaurantes').click();
    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Restaurantes.');
    await expect(page.getByTestId('business-card-restaurantes')).toHaveAttribute('aria-pressed', 'true');

    await page.getByTestId('discovery-close').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio/);
  });

  test('responsivo: sem overflow horizontal nas rotas tocadas', async ({ page }) => {
    test.setTimeout(120000);

    const routes = [
      '/',
      '/produtos',
      '/produtos?modo=negocio&negocio=barbearias',
      '/produtos/customer-portal',
      '/produtos/fieldops',
      '/produtos/kitchen-sync',
      '/produtos/hotel-operations',
      '/produtos/stock-orders',
      '/produtos/kavtris-ops',
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

  test('axe: zero violações graves/críticas nas rotas refinadas (inclui todos os produtos)', async ({ page }) => {
    const routes = [
      '/',
      '/produtos',
      '/produtos?modo=negocio&negocio=barbearias',
      '/empresas',
      ...productSlugs.map((slug) => `/produtos/${slug}`)
    ];
    for (const route of routes) {
      await page.goto(route);
      await settle(page, 700);
      // Homepage sections are scroll-revealed; make them visible before axe so
      // pending (opacity 0) text is not flagged as a contrast failure.
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
