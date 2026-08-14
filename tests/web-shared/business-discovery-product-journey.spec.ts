import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';
import { revealWholePage } from '../shared/helpers/reveal';

/**
 * WEB.1F.8 — product journey synchronization and business discovery parity.
 *
 *  - Business normal entry starts at the top (/produtos?modo=negocio), the
 *    duplicate grid headline is gone, internal return anchors still work
 *  - Business filters (Todos/Serviços/Alimentação/Alojamento/Retalho/Equipas/
 *    Gestão) mirror system discovery; filter + point-of-start stay coherent
 *  - Product journey order: Configurator → Evolution → Adaptation → Demo →
 *    Technical details, for all six products
 *  - One page-level selected level (single source of truth): hero CTA,
 *    configurator, evolution, adaptation, demonstration and summary all sync
 *  - Redundant mid-product conversion block removed; final consultant escape
 *    preserved; hero doubt path "Tirar uma dúvida" → /#contacto
 */
test.describe('WEB.1F.8', () => {
  const settle = (page: import('@playwright/test').Page, ms = 500) => page.waitForTimeout(ms);

  const productSlugs = [
    'fieldops',
    'stock-orders',
    'hotel-operations',
    'kitchen-sync',
    'qevaryn-ops',
    'customer-portal'
  ];

  const assertSectionOrder = async (page: import('@playwright/test').Page, selectors: string[]) => {
    const tops = await page.evaluate((sels) => {
      return sels.map((sel) => {
        const el = document.querySelector(sel);
        return el ? el.getBoundingClientRect().top + window.scrollY : -1;
      });
    }, selectors);
    for (const top of tops) {
      expect(top, `selector in ${selectors.join(',')} should exist`).toBeGreaterThanOrEqual(0);
    }
    for (let i = 0; i < tops.length - 1; i += 1) {
      expect(tops[i + 1], `${selectors[i]} should come before ${selectors[i + 1]}`).toBeGreaterThan(tops[i]);
    }
  };

  test('negócio: entrada normal começa no topo sem #tipos-de-negocio (home + /produtos + engenharia)', async ({ page }) => {
    await page.goto('/');
    await settle(page, 400);
    await page.locator('#como-funciona').getByRole('link', { name: 'Escolher pelo meu negócio' }).click();
    await expect(page).toHaveURL(/\/produtos\?modo=negocio$/);
    await expect(page.getByRole('heading', { name: 'Descubra sistemas a partir do contexto da sua empresa.' })).toBeInViewport();

    await page.goto('/produtos');
    await settle(page, 400);
    await page.getByTestId('products-mode-business-primary').getByRole('link', { name: 'Escolher pelo meu negócio' }).click();
    await expect(page).toHaveURL(/\/produtos\?modo=negocio$/);

    await page.goto('/empresas');
    await settle(page, 400);
    await expect(page.getByTestId('engineering-final-business').getByRole('link', { name: 'Encontrar pelo meu negócio' })).toHaveAttribute(
      'href',
      '/produtos?modo=negocio'
    );
  });

  test('negócio: headline duplicada removida — hero explica, grelha pergunta', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 500);

    await expect(page.getByRole('heading', { name: 'Descubra sistemas a partir do contexto da sua empresa.' })).toHaveCount(1);
    await expect(page.getByText('Não precisa saber qual sistema precisa antes de falar connosco.', { exact: false })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Encontre o ponto de partida mais próximo.' })).toBeVisible();
    await expect(page.getByText('Escolha o contexto que mais se aproxima da sua operação.')).toBeVisible();
    await expect(page.getByText('Descubra sistemas a partir do contexto da sua empresa.', { exact: false })).toHaveCount(1);

    await expect(page.getByTestId('business-hero-cta')).toHaveAttribute('href', '#tipos-de-negocio');
  });

  test('negócio: filtros — Todos default, cada filtro mostra só o contexto certo', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 500);

    const visibleCount = () => page.locator('[data-testid^="business-card-"]:visible').count();

    await expect(page.getByTestId('business-filter-todos')).toHaveAttribute('aria-pressed', 'true');
    await expect(visibleCount()).resolves.toBe(6);

    const expectations: Array<[string, string, string]> = [
      ['servicos', 'Barbearias e salões', 'Restaurantes'],
      ['alimentacao', 'Restaurantes', 'Hotéis e alojamento'],
      ['alojamento', 'Hotéis e alojamento', 'Lojas e retalho'],
      ['retalho', 'Lojas e retalho', 'Equipas no terreno'],
      ['equipas', 'Equipas no terreno', 'Escritórios e gestão'],
      ['gestao', 'Escritórios e gestão', 'Barbearias e salões']
    ];

    for (const [filterId, visible, hidden] of expectations) {
      await page.getByTestId(`business-filter-${filterId}`).click();
      await expect(page.getByTestId(`business-filter-${filterId}`)).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('button', { name: visible, exact: false })).toBeVisible();
      await expect(page.getByRole('button', { name: hidden, exact: false })).toHaveCount(0);
      await expect(visibleCount()).resolves.toBe(1);
    }

    await page.getByTestId('business-filter-todos').click();
    await expect(page.getByTestId('business-filter-todos')).toHaveAttribute('aria-pressed', 'true');
    await expect(visibleCount()).resolves.toBe(6);
  });

  test('negócio: filtro que esconde o ponto de partida aberto fecha-o de forma coerente', async ({ page }) => {
    await page.goto('/produtos?modo=negocio&negocio=barbearias');
    await settle(page, 600);

    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Barbearias e salões.');
    await expect(page.getByTestId('business-card-barbearias')).toHaveAttribute('aria-pressed', 'true');

    await page.getByTestId('business-filter-alimentacao').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio$/);
    await expect(page).not.toHaveURL(/negocio=barbearias/);
    await expect(page.getByRole('button', { name: /Restaurantes/, exact: false })).toBeVisible();
    await expect(page.getByRole('button', { name: /Barbearias e salões/ })).toHaveCount(0);

    await page.getByTestId('business-card-restaurantes').click();
    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Restaurantes.');
    await page.getByTestId('business-filter-todos').click();
    await expect(page.getByTestId('discovery-panel-content')).toContainText('Ponto de partida para Restaurantes.');
    await expect(page.getByTestId('business-card-restaurantes')).toHaveAttribute('aria-pressed', 'true');
  });

  test('negócio: regressão — ponto de partida continua a rolar e fechar devolve à grelha com anchor interno', async ({ page }) => {
    await page.goto('/produtos?modo=negocio');
    await settle(page, 500);

    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await expect(page.getByTestId('discovery-results')).toBeInViewport();

    await page.getByTestId('discovery-close').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos\?modo=negocio#tipos-de-negocio$/);
  });


  test('produto: ordem da jornada — configurador → evolução → adaptação → demonstração → detalhes', async ({ page }) => {
    await page.goto('/produtos/customer-portal');
    await settle(page, 500);
    await assertSectionOrder(page, [
      '[data-testid="product-level-configurator"]',
      '[data-testid="product-evolution"]',
      '[data-testid="product-adaptation"]',
      '[data-testid="product-in-action"]',
      '#detalhes'
    ]);

    await page.goto('/produtos/fieldops');
    await settle(page, 500);
    await assertSectionOrder(page, [
      '[data-testid="product-level-configurator"]',
      '[data-testid="product-evolution"]',
      '[data-testid="fieldops-adaptation"]',
      '[data-testid="fieldops-demonstration"]',
      '#detalhes'
    ]);
  });

  test('produto: um só nível de página sincroniza hero, configurador, evolução, adaptação e demonstração', async ({ page }) => {
    await page.goto('/produtos/customer-portal');
    await settle(page, 600);

    const heroCta = page.getByTestId('hero-adapt-cta');
    const configurator = page.getByTestId('product-level-configurator');
    const evolution = page.getByTestId('product-evolution');
    const adaptation = page.getByTestId('product-adaptation-level');
    const demo = page.getByTestId('product-in-action');
    const summary = page.getByTestId('product-level-summary');

    const assertSync = async (levelLabel: 'Essencial' | 'Crescimento' | 'Empresarial', levelId: string) => {
      await expect(heroCta).toContainText(`Adaptar o ${levelLabel} à minha empresa`);
      await expect(configurator.getByTestId(`product-level-option-${levelId}`)).toHaveAttribute('aria-checked', 'true');
      await expect(summary).toContainText(`${levelLabel} selecionado`);
      await expect(evolution.getByTestId(`product-evolution-phase-${levelId}`).getByTestId('product-evolution-current')).toBeVisible();
      await expect(adaptation).toContainText(`No nível ${levelLabel}`);
      await expect(demo).toContainText(`Nível ${levelLabel}`);
    };

    await assertSync('Essencial', 'essential');

    await configurator.getByTestId('product-level-option-growth').click();
    await assertSync('Crescimento', 'growth');

    await configurator.getByTestId('product-level-option-enterprise').click();
    await assertSync('Empresarial', 'enterprise');

    await expect(configurator.getByTestId('product-level-visual')).toHaveAttribute('data-product-level', 'enterprise');
  });


  test('produto: CTAs de adaptação refletem o nível; CTAs de navegação mantêm-se estáveis', async ({ page }) => {
    await page.goto('/produtos/customer-portal');
    await settle(page, 500);

    const navCtas = ['Ver como funciona', 'Tirar uma dúvida', 'Falar com um consultor'];
    for (const label of navCtas) {
      await expect(page.getByRole('link', { name: label }).first()).toBeVisible();
    }
    await expect(page.getByText('Ver detalhes técnicos').first()).toBeVisible();
    await expect(page.getByTestId('hero-doubt-cta')).toHaveAttribute('href', '/#contacto');
    await expect(page.getByTestId('product-consultant-escape').getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');

    await page.getByTestId('product-level-option-growth').click();
    await expect(page.getByTestId('hero-adapt-cta')).toContainText('Adaptar o Crescimento à minha empresa');
    await expect(page.getByTestId('product-level-cta')).toContainText('Adaptar o Crescimento à minha empresa');
    for (const label of navCtas) {
      await expect(page.getByRole('link', { name: label }).first()).toBeVisible();
    }
    await expect(page.getByText('Ver detalhes técnicos').first()).toBeVisible();

    await page.getByTestId('product-level-option-enterprise').click();
    await expect(page.getByTestId('hero-adapt-cta')).toContainText('Adaptar o Empresarial à minha empresa');
    await expect(page.getByTestId('product-level-cta')).toContainText('Adaptar o Empresarial à minha empresa');
  });

  test('produto: bloco de conversão intermédio removido e escape final preservado', async ({ page }) => {
    await page.goto('/produtos/fieldops');
    await settle(page, 500);

    await expect(page.getByText('Quer saber como o FieldOps funcionaria na sua empresa?')).toHaveCount(0);
    await expect(page.getByText('Ainda não sei qual solução preciso')).toHaveCount(0);
    await expect(page.getByText('Explique como os serviços são organizados atualmente', { exact: false })).toHaveCount(0);

    await expect(page.getByTestId('product-consultant-escape')).toBeVisible();
    await expect(page.getByTestId('product-consultant-escape').getByRole('heading', { name: 'Não encontrou exatamente o que precisa?' })).toBeVisible();
    await expect(page.getByTestId('product-consultant-escape').getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');
  });

  test('produto: todas as páginas têm CTA de dúvida no hero e a mesma jornada partilhada', async ({ page }) => {
    for (const slug of productSlugs) {
      await page.goto(`/produtos/${slug}`);
      await settle(page, 500);

      const doubt = page.getByTestId('hero-doubt-cta');
      await expect(doubt).toBeVisible();
      await expect(doubt).toHaveAttribute('href', '/#contacto');

      await expect(page.getByTestId('product-level-configurator')).toBeVisible();
      await expect(page.getByTestId('product-evolution')).toBeVisible();
      if (slug === 'fieldops') {
        await expect(page.getByTestId('fieldops-adaptation')).toBeVisible();
        await expect(page.getByTestId('fieldops-demonstration')).toBeVisible();
      } else {
        await expect(page.getByTestId('product-adaptation')).toBeVisible();
        await expect(page.getByTestId('product-in-action')).toBeVisible();
      }
      await expect(page.getByTestId('product-consultant-escape')).toBeVisible();
      if (slug === 'fieldops') {
        await expect(page.getByRole('heading', { name: 'Detalhes técnicos para empresas e equipas de tecnologia' })).toBeVisible();
      } else {
        await expect(page.getByText('Ver detalhes técnicos').first()).toBeVisible();
      }
    }

    await page.goto('/produtos/customer-portal');
    await settle(page, 400);
    await page.getByTestId('hero-doubt-cta').click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test('responsive: sem overflow horizontal nas rotas tocadas', async ({ page }) => {
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
      '/empresas',
      ...productSlugs.map((slug) => `/produtos/${slug}`)
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
