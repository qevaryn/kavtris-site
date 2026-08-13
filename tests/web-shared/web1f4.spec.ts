import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';

/**
 * WEB.1F.4 — KAVTRIS Accessible Navigation Memory, Discovery Close & Final UX Cleanup.
 *
 *  - Header: explicit "Início" (desktop + mobile), exclusive route-active state
 *  - Navigation memory: explicit Back/Forward, native history preserved,
 *    multi-step Back/Forward, scroll + focus restoration, safe direct-entry fallback
 *  - Business discovery: PRIMARY path, contextual panel with ✕ Fechar and
 *    "← Voltar aos tipos de negócio", Escape, single panel, no history spam,
 *    deep-link support, URL state matches UI
 *  - Homepage heavy dark section shadow removed; Contact block spacing
 *  - Accessibility + responsive regression
 */
test.describe('WEB.1F.4', () => {
  const headerNav = (page: import('@playwright/test').Page) =>
    page.getByRole('navigation', { name: 'Navegação principal' });

  const settle = (page: import('@playwright/test').Page, ms = 1100) => page.waitForTimeout(ms);

  test('header: Início é o primeiro item e o estado ativo é exclusivo por rota', async ({ page }) => {
    await page.goto('/');
    const nav = headerNav(page);

    // Ordem final exigida.
    const labels = await nav.locator('a').allTextContents();
    expect(labels.map((label) => label.trim()).join(' | ')).toBe(
      'Início | Como trabalhamos | Produtos | Serviços | Sobre | Contacto'
    );

    const inicio = nav.getByRole('link', { name: 'Início', exact: true });
    await expect(inicio).toHaveAttribute('href', '/#inicio');
    await expect(inicio).toHaveAttribute('aria-current', 'page');

    // Sem estados ativos duplicados na Home.
    await expect(nav.getByRole('link', { name: 'Como trabalhamos', exact: true })).not.toHaveAttribute('aria-current', 'page');

    await page.goto('/produtos');
    await expect(nav.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(inicio).not.toHaveAttribute('aria-current', 'page');

    await page.goto('/empresas');
    await expect(nav.getByRole('link', { name: 'Serviços', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(inicio).not.toHaveAttribute('aria-current', 'page');

    await page.goto('/sobre');
    await expect(nav.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('aria-current', 'page');
  });

  test('Início: clique repetido volta ao Hero e funciona a partir de outra página', async ({ page }) => {
    await page.goto('/');
    const inicio = headerNav(page).getByRole('link', { name: 'Início', exact: true });

    // Scroll até ao Contacto e clicar Início.
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
    await inicio.click();
    await expect(page.locator('#inicio')).toBeInViewport();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(400);

    // Scrollar outra vez e clicar Início de novo (repetido).
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
    await inicio.click();
    await expect(page.locator('#inicio')).toBeInViewport();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(400);

    // A partir de outra página.
    await page.goto('/empresas');
    await inicio.click();
    await expect(page).toHaveURL(/#inicio$/);
    await expect(page.locator('#inicio')).toBeInViewport();
  });

  test('mobile: menu móvel tem Início como primeiro item e navega para a Home', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/produtos');
    await expectNoHorizontalOverflow(page);

    await page.getByRole('button', { name: 'Abrir menu' }).click();
    const mobileNav = page.getByRole('navigation', { name: 'Menu móvel' });
    const firstLink = mobileNav.locator('a').first();
    await expect(firstLink).toHaveAttribute('href', '/#inicio');
    await expect(firstLink).toHaveText('Início');

    await firstLink.click();
    await expect(page).toHaveURL(/#inicio$/);
    await expect(page.locator('#inicio')).toBeInViewport();
  });

  test('páginas internas: Back/Forward explícitos com fallback seguro de entrada direta', async ({ page }) => {
    await page.goto('/produtos');
    const controls = page.getByTestId('nav-back-forward');
    await expect(controls).toBeVisible();
    // Entrada direta: sem histórico interno anterior → fallback "← Início".
    await expect(page.getByTestId('nav-back-control')).toHaveText(/Início/);
    await expect(page.getByTestId('nav-forward-control')).toBeDisabled();

    await page.goto('/empresas');
    await expect(page.getByTestId('nav-back-forward')).toBeVisible();
    await page.goto('/sobre');
    await expect(page.getByTestId('nav-back-forward')).toBeVisible();
    await page.goto('/produtos/stock-orders');
    await expect(page.getByTestId('nav-back-forward')).toBeVisible();
  });

  test('back stack: multi-passo Back restaura contexto e posição (sem voltar sempre ao topo)', async ({ page }) => {
    await page.goto('/');
    await settle(page, 600);
    await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1200);

    // 0 Home (posição produtos) → 1 anchor → 2 /produtos → 3 barbearias.
    await headerNav(page).getByRole('link', { name: 'Como trabalhamos', exact: true }).click();
    await expect(page.locator('#como-trabalhamos')).toBeInViewport();
    await settle(page, 600);

    await headerNav(page).getByRole('link', { name: 'Produtos', exact: true }).click();
    await expect(page).toHaveURL(/\/produtos$/);
    await settle(page, 600);

    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await expect(page).toHaveURL(/negocio=barbearias/);

    // Voltar → grelha /produtos com o card de origem restaurado.
    await page.getByTestId('nav-back-control').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos$/);
    await expect(page.getByTestId('business-card-barbearias')).toBeInViewport();

    // Voltar → secção Como trabalhamos na Home.
    await page.getByTestId('nav-back-control').click();
    await expect(page).toHaveURL(/#como-trabalhamos$/);
    await expect(page.locator('#como-trabalhamos')).toBeInViewport();

    // Voltar → Home na posição original (produtos visível, não no topo).
    await page.goBack();
    await settle(page, 900);
    await expect(page).toHaveURL(/127.0.0.1:3000\/$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  });

  test('forward stack: Avançar restaura a sequência e nova navegação corta o ramo antigo', async ({ page }) => {
    await page.goto('/');
    await settle(page, 600);
    await headerNav(page).getByRole('link', { name: 'Como trabalhamos', exact: true }).click();
    await expect(page.locator('#como-trabalhamos')).toBeInViewport();
    await settle(page, 600);
    await headerNav(page).getByRole('link', { name: 'Produtos', exact: true }).click();
    await expect(page).toHaveURL(/\/produtos$/);
    await settle(page, 600);
    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    // Back ×2 para a Home (browser Back na Home; explícito nas páginas internas).
    await page.getByTestId('nav-back-control').click();
    await page.waitForURL(/\/produtos$/);
    await settle(page, 900);
    await page.getByTestId('nav-back-control').click();
    await expect(page).toHaveURL(/#como-trabalhamos$/);
    await settle(page, 900);
    await page.goBack();
    await expect(page).toHaveURL(/127.0.0.1:3000\/$/);
    await settle(page, 600);

    // Forward (browser) → #como-trabalhamos.
    await page.goForward();
    await expect(page).toHaveURL(/#como-trabalhamos$/);
    await expect(page.locator('#como-trabalhamos')).toBeInViewport();
    await settle(page, 600);

    // Forward (browser) → /produtos.
    await page.goForward();
    await expect(page).toHaveURL(/\/produtos$/);
    await settle(page, 600);

    // Forward explícito → descoberta.
    const forwardControl = page.getByTestId('nav-forward-control');
    await expect(forwardControl).toBeEnabled();
    await forwardControl.click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await expect(page).toHaveURL(/negocio=barbearias/);

    // Fecha com X e volta à Home; nova navegação deve cortar o ramo forward.
    await page.getByTestId('discovery-close').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await settle(page, 600);
    await page.getByTestId('nav-back-control').click();
    await expect(page).toHaveURL(/#como-trabalhamos$/);
    await settle(page, 600);
    await page.goBack();
    await expect(page).toHaveURL(/127.0.0.1:3000\/$/);
    await settle(page, 600);

    await headerNav(page).getByRole('link', { name: 'Produtos', exact: true }).click();
    await expect(page).toHaveURL(/\/produtos$/);
    await settle(page, 600);
    await expect(page.getByTestId('nav-forward-control')).toBeDisabled();
  });


  test('discovery: painel único com ✕ Fechar restaura o card de origem e limpa o URL', async ({ page }) => {
    await page.goto('/produtos');
    await settle(page, 600);

    await page.getByTestId('business-card-barbearias').click();
    const panel = page.getByTestId('discovery-results');
    await expect(panel).toBeVisible();
    await expect(page).toHaveURL(/negocio=barbearias/);

    // Controles de fecho explícitos.
    await expect(page.getByTestId('discovery-close')).toHaveText(/Fechar/);
    await expect(page.getByTestId('discovery-back-to-business')).toHaveText(/Voltar aos tipos de negócio/);

    // Fechar: painel some, seleção limpa, query limpa, card de origem visível.
    await page.getByTestId('discovery-close').click();
    await expect(panel).toHaveCount(0);
    await expect(page.getByTestId('business-card-barbearias')).toHaveAttribute('aria-pressed', 'false');
    await expect(page).toHaveURL(/\/produtos$/);
    await expect(page).not.toHaveURL(/negocio=/);
    await expect(page.getByTestId('business-card-barbearias')).toBeInViewport();

    // Só UM painel existe em qualquer estado.
    await page.getByTestId('business-card-restaurantes').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(1);
  });

  test('discovery: Escape fecha o painel e devolve o foco ao card de origem', async ({ page }) => {
    await page.goto('/produtos');
    await settle(page, 600);

    await page.getByTestId('business-card-barbearias').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos$/);
    await expect(page.getByTestId('business-card-barbearias')).toBeFocused();
    await expect(page.getByTestId('business-card-barbearias')).toBeInViewport();
  });

  test('discovery: trocar de categoria substitui o mesmo painel sem spammar o histórico', async ({ page }) => {
    await page.goto('/produtos');
    await settle(page, 600);

    const lengthBefore = await page.evaluate(() => window.history.length);
    await page.getByTestId('business-card-barbearias').click();
    await expect(page).toHaveURL(/negocio=barbearias/);
    const lengthAfterOpen = await page.evaluate(() => window.history.length);
    expect(lengthAfterOpen).toBe(lengthBefore + 1);

    await page.getByTestId('business-card-restaurantes').click();
    await expect(page).toHaveURL(/negocio=restaurantes/);
    await expect(page.getByTestId('discovery-results')).toHaveCount(1);
    await expect(page.getByTestId('discovery-results').getByRole('heading', { name: /restaurantes/ })).toBeVisible();
    const lengthAfterSwitch = await page.evaluate(() => window.history.length);
    expect(lengthAfterSwitch).toBe(lengthAfterOpen);
  });

  test('discovery: deep link direto abre selecionado e o fecho não usa Back externo', async ({ page }) => {
    await page.goto('/produtos?negocio=barbearias');
    await settle(page, 600);

    await expect(page.getByTestId('business-card-barbearias')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('discovery-results')).toBeVisible();

    await page.getByTestId('discovery-close').click();
    await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    await expect(page).toHaveURL(/\/produtos$/);
    await expect(page.getByTestId('business-card-barbearias')).toBeVisible();
  });


  test('home: véu escuro pesado removido e separação limpa para a secção clara', async ({ page }) => {
    await page.goto('/');
    await settle(page, 600);

    // O gradiente escuro antigo desapareceu (verificado também a nível de origem no web1c).
    await expect(page.getByTestId('processo-dark-light-transition')).toHaveCount(0);

    // A secção clara começa com fundo claro (luminância alta) — sem faixa preta.
    const bg = await page.locator('#como-trabalhamos').evaluate((node) => getComputedStyle(node).backgroundColor);
    const [r, g, b] = bg.match(/\d+/g)!.map(Number);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    expect(luminance).toBeGreaterThan(220);
  });

  test('contacto: blocos informativos têm separação vertical adequada', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    await settle(page, 600);

    const nextSteps = page.getByText('O que acontece depois?');
    const rede = page.locator('#contacto [data-testid="rede-contact-card-desktop"]').getByText('Integrante da Rede Qualidade é Vida');
    await expect(nextSteps).toBeVisible();
    await expect(rede).toBeVisible();

    const gap = await nextSteps.evaluate((node) => {
      const card = node.closest('.panel-light')!;
      const redeWrapper = document.querySelector('#contacto [data-testid="rede-contact-card-desktop"]');
      if (!redeWrapper) return -1;
      // O wrapper é transparente (apenas espaçamento); medir até ao card visual.
      const redeCard = redeWrapper.firstElementChild as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const redeRect = redeCard.getBoundingClientRect();
      return redeRect.top - cardRect.bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(16);
  });

  test('axe: /produtos com painel de descoberta aberto sem violações graves ou críticas', async ({ page }) => {
    await page.goto('/produtos');
    await settle(page, 600);
    await page.getByTestId('business-card-barbearias').click();
    await expect(page.getByTestId('discovery-results')).toBeVisible();
    await settle(page, 500);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
  });

  test('responsive: /produtos sem overflow horizontal com painel aberto', async ({ page }) => {
    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/produtos');
      await expectNoHorizontalOverflow(page);
      await page.getByTestId('business-card-barbearias').click();
      await expect(page.getByTestId('discovery-results')).toBeVisible();
      await expectNoHorizontalOverflow(page);
      await page.getByTestId('discovery-close').click();
      await expect(page.getByTestId('discovery-results')).toHaveCount(0);
    }
  });
});

