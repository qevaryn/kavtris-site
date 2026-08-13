import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';

/**
 * WEB.1F.3 — KAVTRIS Product Discovery, Services Navigation & Internal Pages UX.
 *
 *  - same-hash anchor regression (repeated clicks always scroll again)
 *  - Header: "Como funciona" / "Produtos" / "Engenharia" / "Sobre" / "Contacto"
 *    with route-aware active state; Engenharia opens /empresas
 *  - /produtos: two-profile model, business discovery, honest adaptable
 *    starting points, catalog preserved
 *  - /empresas: business-first hero, problem recognition, technical depth kept
 *  - /sobre: present-day KAVTRIS brand, preserved historical context, final CTA
 *  - mobile: no overflow, mobile menu routes to /empresas
 */
test.describe('WEB.1F.3', () => {
  test('header: Engenharia abre /empresas e o estado ativo reflete a rota', async ({ page }) => {
    await page.goto('/empresas');

    const nav = page.getByRole('navigation', { name: 'Navegação principal' });
    const engineeringLink = nav.getByRole('link', { name: 'Engenharia', exact: true });
    await expect(engineeringLink).toHaveAttribute('href', '/empresas');
    await expect(engineeringLink).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Produtos', exact: true })).not.toHaveAttribute('aria-current', 'page');

    await page.goto('/produtos');
    await expect(nav.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('aria-current', 'page');

    await page.goto('/sobre');
    await expect(nav.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('aria-current', 'page');
  });

  test('âncora repetida: clicar duas vezes em "Como funciona" volta a rolar', async ({ page }) => {
    await page.goto('/');

    const section = page.locator('#como-funciona');
    const headerLink = page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Como funciona', exact: true });

    await headerLink.click();
    await expect(section).toBeInViewport();
    await expect(page).toHaveURL(/#como-funciona$/);

    // Deixa o scroll suave terminar antes de sair da secção manualmente.
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    // …e clica novamente no mesmo link (mesmo hash).
    await headerLink.click();
    await expect(section).toBeInViewport();
  });

  test('âncora repetida: contacto também volta a rolar com o mesmo hash', async ({ page }) => {
    await page.goto('/');

    const contactSection = page.locator('#contacto');
    const contactLink = page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Contacto', exact: true });

    await contactLink.click();
    await expect(contactSection).toBeInViewport();

    // Deixa o scroll suave terminar antes de sair da secção manualmente.
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    await contactLink.click();
    await expect(contactSection).toBeInViewport();
  });

  test('hero: CTA principal é "Ver como funciona" e navega para #como-funciona', async ({ page }) => {
    await page.goto('/');

    const heroCta = page.locator('#inicio').getByRole('link', { name: 'Ver como funciona' });
    await expect(heroCta).toHaveAttribute('href', '#como-funciona');
    await heroCta.click();
    await expect(page.locator('#como-funciona')).toBeInViewport();
  });

  test('/produtos: seletor de modo por defeito; modo negócio com pontos de partida honestos', async ({ page }) => {
    await page.goto('/produtos');

    // Sem branding ativo antigo; eyebrow KAVTRIS-consistente.
    await expect(page.getByText('PRODUTOS QEVARYN')).toHaveCount(0);
    await expect(page.getByText('Produtos e Soluções')).toBeVisible();

    // WEB.1F.5 — entrada por defeito: escolha de modo primeiro (sem conteúdo).
    const selector = page.locator('main');
    await expect(selector.getByRole('heading', { name: 'Como prefere começar?' })).toBeVisible();
    await expect(page.getByTestId('products-mode-business-primary')).toBeVisible();
    await expect(page.getByTestId('products-mode-systems-secondary')).toBeVisible();
    await expect(page.getByTestId('business-card-barbearias')).toHaveCount(0);
    await expect(page.getByTestId('product-card')).toHaveCount(0);

    // Modo negócio: cartões de descoberta por negócio.
    await page.goto('/produtos?modo=negocio');
    for (const label of [
      'Barbearias e salões',
      'Restaurantes',
      'Hotéis e alojamento',
      'Lojas e retalho',
      'Equipas no terreno',
      'Escritórios e gestão'
    ]) {
      await expect(page.getByRole('button', { name: new RegExp(label) })).toBeVisible();
    }

    // Selecionar barbearias mostra pontos de partida ADAPTÁVEIS — nunca um
    // produto falso específico de barbearia.
    await page.getByTestId('business-card-barbearias').click();
    const results = page.getByTestId('discovery-results');
    await expect(results).toBeVisible();
    await expect(
      results.getByRole('heading', { name: /Ponto de partida para [Bb]arbearias e salões/ })
    ).toBeVisible();
    await expect(results.getByText('Pode ser adaptado').first()).toBeVisible();
    await expect(page.getByText(/Barbearia System|Barber System|Sistema para Barbearias/i)).toHaveCount(0);
  });

  test('/produtos?modo=sistemas: catálogo com filtros funcionais e ajuda de consultor', async ({ page }) => {
    await page.goto('/produtos?modo=sistemas');

    // Catálogo de sistemas com filtros funcionais.
    await expect(page.getByTestId('product-card')).toHaveCount(6);
    await expect(page.locator('#catalogo').getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true');

    // Ajuda de consultor: o catálogo nunca é um beco sem saída.
    const consultant = page.getByTestId('systems-consultant');
    await expect(consultant.getByRole('heading', { name: 'Não encontrou o sistema que procura?' })).toBeVisible();
    await expect(consultant.getByRole('link', { name: 'Falar com um consultor' })).toHaveAttribute('href', '/#contacto');
  });

  test('/produtos?modo=negocio&negocio=restaurantes pré-seleciona a categoria (query estável)', async ({ page }) => {
    await page.goto('/produtos?modo=negocio&negocio=restaurantes');

    await expect(page.getByTestId('business-card-restaurantes')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await expect(page).toHaveURL(/modo=negocio&negocio=restaurantes/);
  });


  test('/empresas: hero business-first, reconhecimento de problemas e profundidade técnica', async ({ page }) => {
    await page.goto('/empresas');

    await expect(page.getByRole('heading', { name: /Tecnologia adaptada à realidade da sua empresa/ })).toBeVisible();
    await expect(page.getByText('O que a KAVTRIS faz por si')).toBeVisible();
    for (const approach of ['Adaptar', 'Combinar', 'Integrar', 'Desenvolver']) {
      await expect(page.getByText(approach, { exact: true })).toBeVisible();
    }

    // Reconhecimento de problemas em linguagem de negócio.
    await expect(page.getByRole('heading', { name: 'Quando faz sentido falar com a KAVTRIS?' })).toBeVisible();
    await expect(page.getByText(/Ainda usa várias folhas de Excel/i)).toBeVisible();
    await expect(page.getByText(/Os sistemas da empresa não comunicam entre si/i)).toBeVisible();

    // Credibilidade técnica preservada.
    await expect(page.getByRole('heading', { name: 'Fundamentos antes da construção' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Segurança e acessos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Detalhe técnico quando o projeto exige' })).toBeVisible();

    // CTAs: negócio primeiro.
    await expect(page.getByRole('link', { name: 'Falar sobre a minha empresa' }).first()).toHaveAttribute(
      'href',
      '/?tipo=empresa#contacto'
    );
    await expect(page.getByRole('link', { name: 'Ver como trabalhamos' })).toHaveAttribute('href', '#como-trabalhamos');
  });

  test('/sobre: identidade atual KAVTRIS, contexto histórico preservado e CTA final', async ({ page }) => {
    await page.goto('/sobre');

    await expect(page.getByText(/A história que deu origem à KAVTRIS/i)).toBeVisible();
    // Sem Qevaryn em afirmações do presente.
    await expect(page.locator('main').getByText(/Qevaryn/i)).toHaveCount(0);
    await expect(page.getByText('Evolução da marca para KAVTRIS')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Ver como funciona' })).toHaveAttribute('href', '/#como-funciona');
    await expect(page.getByRole('link', { name: 'Falar com a KAVTRIS' })).toHaveAttribute('href', '/#contacto');
  });

  test('mobile: /produtos sem overflow e menu móvel com Engenharia a abrir /empresas', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 780 });
    await page.goto('/produtos');
    await expectNoHorizontalOverflow(page);
    await expect(page.getByTestId('products-mode-business-primary')).toBeVisible();

    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    const mobileNav = page.getByRole('navigation', { name: 'Menu móvel' });
    const engineeringLink = mobileNav.getByRole('link', { name: 'Engenharia', exact: true });
    await expect(engineeringLink).toHaveAttribute('href', '/empresas');
    await engineeringLink.click();
    await expect(page).toHaveURL(/\/empresas$/);
    await expect(page.getByRole('heading', { name: /Tecnologia adaptada à realidade/i })).toBeVisible();
  });

  test('axe: /produtos e /empresas sem violações graves ou críticas', async ({ page }) => {
    await page.goto('/produtos');
    const productsResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(productsResults.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);

    await page.goto('/empresas');
    const enterpriseResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(enterpriseResults.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
  });
});

