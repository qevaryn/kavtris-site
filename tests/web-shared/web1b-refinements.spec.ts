import { expect, test, type Locator } from '@playwright/test';

/**
 * WEB.1B — validation suite for the refined homepage:
 *  - infinite credibility loop (seamless, accessible, bounded)
 *  - protected loops wrap-around (How We Work / Products / Engineering mobile)
 *  - Engineering desktop grid vs mobile carousel (single data source)
 *  - mobile Hero adaptation (order, descriptor, no clipping/overflow)
 *  - background depth gate (not flat, not portal-like)
 *  - Contact mobile order and Footer legibility
 */

async function readActiveIndicatorLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

async function collectConsoleErrors(page: import('@playwright/test').Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(String(error)));
  return errors;
}

test('credibility loop é infinito, contínuo e acessível (duplicação escondida)', async ({ page }) => {
  const errors = await collectConsoleErrors(page);
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const mainTrack = page.getByTestId('services-ticker-main');
  const duplicateTrack = page.getByTestId('services-ticker-duplicate');
  const viewport = page.getByTestId('services-ticker-viewport');

  // Inventory: 8 real items in the main track; duplicate track is hidden + inert.
  await expect(mainTrack.locator('li')).toHaveCount(8);
  await expect(duplicateTrack.locator('li')).toHaveCount(8);
  await expect(duplicateTrack).toHaveAttribute('aria-hidden', 'true');
  await expect.poll(() => duplicateTrack.evaluate((node) => (node as HTMLElement).inert)).toBe(true);

  // The two tracks carry the same content — the loop boundary is visually identical.
  const mainTexts = await mainTrack.locator('li').allTextContents();
  const duplicateTexts = await duplicateTrack.locator('li').allTextContents();
  expect(mainTexts).toEqual(duplicateTexts);
  const mainWidth = await mainTrack.evaluate((node) => node.scrollWidth);
  const duplicateWidth = await duplicateTrack.evaluate((node) => node.scrollWidth);
  expect(Math.abs(mainWidth - duplicateWidth)).toBeLessThanOrEqual(2);

  // Continuous motion: scrollLeft moves and stays normalized within one cycle.
  await page.evaluate(() => {
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' });
  });
  await expect.poll(() => viewport.evaluate((el) => el.scrollLeft), { timeout: 5000 }).toBeGreaterThan(0);

  const samples: number[] = [];
  for (let i = 0; i < 30; i += 1) {
    samples.push(await viewport.evaluate((el) => el.scrollLeft));
    await page.waitForTimeout(60);
  }
  const maxScroll = Math.max(...samples);
  expect(maxScroll).toBeLessThan(mainWidth + 4);
  expect(maxScroll).toBeGreaterThan(0);

  // Manual navigation has no dead-end after many steps (wrap normalizes).
  for (let i = 0; i < 10; i += 1) {
    await ticker.getByRole('button', { name: 'Seguinte' }).click();
    await page.waitForTimeout(80);
    const scroll = await viewport.evaluate((el) => el.scrollLeft);
    expect(scroll).toBeGreaterThanOrEqual(0);
    expect(scroll).toBeLessThan(mainWidth + 4);
  }

  await page.waitForTimeout(400);
  expect(errors).toEqual([]);
});

test('creedibilidade reduzida mantém grelha estática acessível (sem loop vazio)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const staticGrid = page.getByTestId('services-static-reduced');
  await expect(staticGrid).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toHaveCount(0);
  await expect(staticGrid.getByTestId('services-static-grid').locator('article')).toHaveCount(8);
  for (const title of ['Consultoria ativa', 'Tecnologia adaptável', 'Resultados reais', 'Reduzir tarefas manuais']) {
    await expect(staticGrid.getByText(title).first()).toBeVisible();
  }
});

test('loop da How We Work dá a volta sem dead-end (5 passos)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('process-carousel');
  const startLabel = await readActiveIndicatorLabel(carousel);
  expect(startLabel).toBe('Ir para Passo 1: Identificar');

  // 5 steps forward → wraps back to the first step with valid indicator state.
  for (let i = 0; i < 5; i += 1) {
    await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  }
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(startLabel);
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
  await expect(carousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');

  // Previous on the first step goes to the last without dead-end.
  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Passo 5: Evoluir');
});

test('loop de produtos dá a volta sem dead-end (4 itens) no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const startLabel = await readActiveIndicatorLabel(carousel);
  expect(startLabel).toBe('Ir para Qevaryn FieldOps');

  for (let i = 0; i < 4; i += 1) {
    await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  }
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(startLabel);
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);

  // Previous wrap also works.
  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect
    .poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 })
    .toBe('Ir para Solução personalizada para o seu contexto');
});

test('engineering: desktop grid e mobile carousel partilham o mesmo conteúdo', async ({ page }) => {
  const pillarTitles = ['Segurança e acessos', 'Qualidade e testes', 'Integrações e arquitetura', 'Suporte e continuidade'];

  // Desktop → approved structured grid; no carousel.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.locator('#empresas').scrollIntoViewIfNeeded();
  const grid = page.getByTestId('enterprise-capabilities-grid');
  await expect(grid).toBeVisible();
  await expect(page.getByTestId('enterprise-capabilities-carousel')).toBeHidden();
  for (const title of pillarTitles) {
    await expect(grid.getByText(title)).toBeVisible();
  }

  // Mobile → protected infinite carousel; no grid.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#empresas').scrollIntoViewIfNeeded();
  const carousel = page.getByTestId('enterprise-capabilities-carousel');
  await expect(carousel).toBeVisible();
  await expect(page.getByTestId('enterprise-capabilities-grid')).toBeHidden();
  for (const title of pillarTitles) {
    await expect(carousel.getByText(title).first()).toBeVisible();
  }

  // Mobile loop wraps (4 items).
  const startLabel = await readActiveIndicatorLabel(carousel);
  for (let i = 0; i < 4; i += 1) {
    await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  }
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(startLabel);
});


test('hero mobile: ordem preferida, descritor legível e visual sem clipping/overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');

  const hero = page.locator('#inicio');
  await expect(hero.getByText('TECHNOLOGY & CONSULTING')).toBeVisible();

  // Preferred order: eyebrow → headline → copy → CTAs → K visual → credibility loop.
  const boxes = await Promise.all(
    [
      hero.getByText('KAVTRIS', { exact: true }).first(),
      hero.getByRole('heading', { name: /Tecnologia que/ }),
      hero.getByText(/A KAVTRIS combina consultoria/i),
      hero.getByRole('link', { name: 'Conhecer soluções' }),
      hero.getByRole('link', { name: 'Falar com a KAVTRIS' }),
      page.getByTestId('hero-brand-visual'),
      page.getByTestId('services-ticker')
    ].map((locator) => locator.boundingBox())
  );

  const ys = boxes.map((box) => box?.y ?? 0);
  for (let i = 1; i < ys.length; i += 1) {
    expect(ys[i]).toBeGreaterThanOrEqual(ys[i - 1]);
  }

  // K visual fits the 320px viewport without clipping.
  const visualBox = boxes[5];
  if (!visualBox) {
    throw new Error('hero-brand-visual sem dimensões');
  }
  expect(visualBox.x).toBeGreaterThanOrEqual(0);
  expect(visualBox.x + visualBox.width).toBeLessThanOrEqual(320);

  // No horizontal page overflow.
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('background depth: secções usam ambiente em camadas (dark e light, não fundo plano)', async ({ page }) => {
  await page.goto('/');

  // WEB.1C — hybrid architecture: dark sections keep the dark ambient layer;
  // light body sections use the restrained light ambient layer.
  for (const id of ['inicio']) {
    const section = page.locator(`#${id}`);
    await expect(section).toHaveClass(/kavtris-ambient/);
  }
  for (const id of ['processo', 'produtos-preview', 'empresas', 'contacto']) {
    const section = page.locator(`#${id}`);
    await expect(section).toHaveClass(/kavtris-ambient-light/);
  }

  // Both pseudo-element layers actually render a gradient (depth, not flat).
  for (const id of ['inicio', 'processo']) {
    const background = await page
      .locator(`#${id}`)
      .evaluate((node) => getComputedStyle(node, '::before').backgroundImage);
    expect(background).toContain('radial-gradient');
    expect(background).not.toBe('none');
  }
});

test('contacto mobile: ordem preferida heading → próximo passo → formulário → Rede', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();

  const heading = page.locator('#contacto').getByRole('heading', { name: 'Não precisa chegar com uma solução pronta.' });
  const nextCard = page.locator('#contacto').getByText('O que acontece depois?');
  const form = page.locator('#contacto').getByRole('button', { name: 'Enviar explicação' });
  // Mobile shows the Rede card after the form; the desktop-only instance is hidden.
  const rede = page.locator('#contacto').getByText('Integrante da Rede Qualidade é Vida').last();

  const headingY = (await heading.boundingBox())?.y ?? 0;
  const nextY = (await nextCard.boundingBox())?.y ?? 0;
  const formY = (await form.boundingBox())?.y ?? 0;
  const redeY = (await rede.boundingBox())?.y ?? 0;

  expect(headingY).toBeLessThan(nextY);
  expect(nextY).toBeLessThan(formY);
  expect(formY).toBeLessThan(redeY);
});

test('footer mobile mantém links legíveis e agrupados', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');

  const footer = page.getByRole('contentinfo');
  await expect(footer.getByRole('link', { name: 'Sobre' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Contacto' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Política de Privacidade' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Política de Cookies' })).toBeVisible();

  const fontSize = await footer
    .getByRole('link', { name: 'Política de Privacidade' })
    .evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(fontSize).toBeGreaterThanOrEqual(13);
});

