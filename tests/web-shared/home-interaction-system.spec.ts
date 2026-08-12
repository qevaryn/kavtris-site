import { expect, test, type Locator } from '@playwright/test';

async function readActiveIndicatorLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

async function readScrollLeft(viewport: Locator) {
  return viewport.evaluate((element) => element.scrollLeft);
}

async function waitForScrollChange(viewport: Locator, timeout = 4000) {
  const initial = await readScrollLeft(viewport);
  await expect
    .poll(() => readScrollLeft(viewport), { timeout })
    .not.toBe(initial);
}

const PRODUCT_LABELS = [
  'Ir para Qevaryn FieldOps',
  'Ir para Qevaryn Hotel Operations',
  'Ir para Qevaryn Stock & Orders',
  'Ir para Solução personalizada para o seu contexto'
];

function nextOf(label: string | null, order: readonly string[]) {
  const index = order.indexOf(label ?? '');
  return order[(index + 1) % order.length];
}

test('ticker de serviços mantém duplicação visual escondida e pausa momentaneamente por hover/foco no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const mainTrack = page.getByTestId('services-ticker-main');
  const duplicateTrack = page.getByTestId('services-ticker-duplicate');
  const tickerViewport = page.getByTestId('services-ticker-viewport');

  await expect(mainTrack.getByText('Reduzir tarefas manuais')).toHaveCount(1);
  await expect(ticker.getByText('Reduzir tarefas manuais')).toHaveCount(2);
  await expect(duplicateTrack).toHaveAttribute('aria-hidden', 'true');
  await expect
    .poll(() => duplicateTrack.evaluate((element) => (element as HTMLElement).inert))
    .toBe(true);

  await page.evaluate(() => {
    const mainLi = document.querySelector('[data-testid="services-ticker-main"] li');
    const duplicateLi = document.querySelector('[data-testid="services-ticker-duplicate"] li');

    if (mainLi && !mainLi.querySelector('[data-test-injected="ticker-main-button"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'main injected';
      button.setAttribute('data-test-injected', 'ticker-main-button');
      mainLi.appendChild(button);
    }

    if (duplicateLi && !duplicateLi.querySelector('[data-test-injected="ticker-duplicate-button"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'duplicate injected';
      button.setAttribute('data-test-injected', 'ticker-duplicate-button');
      duplicateLi.appendChild(button);
    }
  });

  const injectedMainButton = mainTrack.getByRole('button', { name: 'main injected' });
  const injectedDuplicateButtonDom = duplicateTrack.locator('[data-test-injected="ticker-duplicate-button"]');

  await injectedMainButton.focus();
  await expect(injectedMainButton).toBeFocused();

  await expect(injectedDuplicateButtonDom).toHaveCount(1);
  await expect(duplicateTrack.getByRole('button', { name: 'duplicate injected' })).toHaveCount(0);

  const duplicateWasFocused = await page.evaluate(() => {
    const duplicateButton = document.querySelector('[data-test-injected="ticker-duplicate-button"]') as HTMLButtonElement | null;
    if (!duplicateButton) {
      return false;
    }

    duplicateButton.focus();
    return document.activeElement === duplicateButton;
  });
  expect(duplicateWasFocused).toBe(false);

  await tickerViewport.focus();
  await page.keyboard.press('Tab');
  await expect(injectedMainButton).toBeFocused();

  await page.locator('header').first().click();
  await expect(injectedMainButton).not.toBeFocused();

  await ticker.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
  });
  await page.mouse.move(0, 0);

  await waitForScrollChange(tickerViewport);

  await ticker.hover();
  const pausedFirst = await readScrollLeft(tickerViewport);
  await page.waitForTimeout(400);
  const pausedSecond = await readScrollLeft(tickerViewport);
  expect(pausedSecond).toBe(pausedFirst);

  await tickerViewport.focus();
  await expect(tickerViewport).toBeFocused();
  const focusedFirst = await readScrollLeft(tickerViewport);
  await page.waitForTimeout(400);
  const focusedSecond = await readScrollLeft(tickerViewport);
  expect(focusedSecond).toBe(focusedFirst);
  await waitForScrollChange(tickerViewport);
});

test('motion budget permite autoplay por seção conforme visibilidade', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const tickerViewport = page.getByTestId('services-ticker-viewport');
  const productsCarousel = page.getByTestId('featured-products-carousel');
  const processCarousel = page.getByTestId('process-carousel');
  const enterpriseCarousel = page.getByTestId('enterprise-capabilities-carousel');

  await ticker.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    document
      .querySelector('[data-testid="services-ticker"]')
      ?.scrollIntoView({ block: 'center' });
  });

  await waitForScrollChange(tickerViewport);

  const productsInitialScroll = await readScrollLeft(productsCarousel.getByTestId('featured-products-carousel-viewport'));
  await page.waitForTimeout(500);

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.locator('#produtos-preview').evaluate((node) => node.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(500);
  await expect
    .poll(() => readScrollLeft(productsCarousel.getByTestId('featured-products-carousel-viewport')), { timeout: 11000 })
    .not.toBe(productsInitialScroll);

  const processInitialScroll = await readScrollLeft(processCarousel.getByTestId('process-carousel-viewport'));
  await expect
    .poll(() => readScrollLeft(processCarousel.getByTestId('process-carousel-viewport')), { timeout: 5000 })
    .toBe(processInitialScroll);

  await page.locator('#processo').scrollIntoViewIfNeeded();
  await page.locator('#processo').evaluate((node) => node.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(500);
  await expect
    .poll(() => readScrollLeft(processCarousel.getByTestId('process-carousel-viewport')), { timeout: 13000 })
    .not.toBe(processInitialScroll);

  const enterpriseInitialScroll = await readScrollLeft(enterpriseCarousel.getByTestId('enterprise-capabilities-carousel-viewport'));
  await page.locator('#empresas').scrollIntoViewIfNeeded();
  await page.locator('#empresas').evaluate((node) => node.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(500);
  await expect
    .poll(() => readScrollLeft(enterpriseCarousel.getByTestId('enterprise-capabilities-carousel-viewport')), { timeout: 12000 })
    .not.toBe(enterpriseInitialScroll);
});

test('ticker e carrosséis respeitam reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('services-static-reduced')).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toHaveCount(0);

  const productsViewport = page.getByTestId('featured-products-carousel-viewport');
  const processViewport = page.getByTestId('process-carousel-viewport');
  const enterpriseViewport = page.getByTestId('enterprise-capabilities-carousel-viewport');

  const initialProductsScroll = await readScrollLeft(productsViewport);
  const initialProcessScroll = await readScrollLeft(processViewport);
  const initialEnterpriseScroll = await readScrollLeft(enterpriseViewport);

  await expect
    .poll(() => readScrollLeft(productsViewport), { timeout: 8500 })
    .toBe(initialProductsScroll);
  await expect
    .poll(() => readScrollLeft(processViewport), { timeout: 10500 })
    .toBe(initialProcessScroll);
  await expect
    .poll(() => readScrollLeft(enterpriseViewport), { timeout: 9500 })
    .toBe(initialEnterpriseScroll);
});

test('produtos em destaque exibem um cartão central e vizinhos parcialmente visíveis', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = carousel.getByTestId('featured-products-carousel-viewport');
  await expect(carousel).toBeVisible();

  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);

  const viewportBox = await viewport.boundingBox();
  if (!viewportBox) {
    throw new Error('viewport sem dimensões');
  }

  const activeSlide = carousel.locator('[data-active="true"]').first();
  const activeBox = await activeSlide.boundingBox();
  const activeOpacity = await activeSlide.evaluate((element) => getComputedStyle(element).opacity);
  if (!activeBox) {
    throw new Error('cartão ativo sem dimensões');
  }

  expect(activeBox.x).toBeGreaterThanOrEqual(viewportBox.x - 1);
  expect(activeBox.x + activeBox.width).toBeLessThanOrEqual(viewportBox.x + viewportBox.width + 1);
  expect(activeOpacity).toBe('1');

  // largura real do cartão conforme a main (xl basis 32% no viewport 1280)
  const widthRatio = activeBox.width / viewportBox.width;
  expect(widthRatio).toBeGreaterThanOrEqual(0.28);
  expect(widthRatio).toBeLessThanOrEqual(0.38);

  const allSlides = carousel.locator('[data-testid^="featured-products-carousel-slide-"]');
  await expect(allSlides).toHaveCount(6);

  const partiallyVisible: number[] = [];
  const totalSlides = await allSlides.count();
  for (let i = 0; i < totalSlides; i += 1) {
    const slide = allSlides.nth(i);
    const dataActive = await slide.getAttribute('data-active');
    if (dataActive === 'true') {
      continue;
    }
    const box = await slide.boundingBox();
    if (!box) {
      continue;
    }
    const overlaps = box.x < viewportBox.x + viewportBox.width && box.x + box.width > viewportBox.x;
    if (overlaps) {
      partiallyVisible.push(i);
      const filter = await slide.evaluate((element) => getComputedStyle(element).filter);
      const transform = await slide.evaluate((element) => getComputedStyle(element).transform);
      expect(transform).toContain('0.92');
      expect(filter).toContain('saturate');
    }
  }
  expect(partiallyVisible.length).toBeGreaterThanOrEqual(2);
  // desktop exibe múltiplos cartões ao mesmo tempo (ativo + vizinhos)
  expect(partiallyVisible.length + 1).toBeGreaterThanOrEqual(3);
});

test('autoplay em destaque troca a cada 2000 ms sem acumular avanços', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.locator('#produtos-preview').evaluate((node) => node.scrollIntoView({ block: 'center' }));

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  await page.waitForTimeout(1500);
  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Qevaryn FieldOps');

  const secondStart = Date.now();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 3500 }).toBe('Ir para Qevaryn Hotel Operations');
  const secondElapsed = Date.now() - secondStart;

  const thirdStart = Date.now();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 4500 }).toBe('Ir para Qevaryn Stock & Orders');
  const thirdElapsed = Date.now() - thirdStart;

  expect(secondElapsed).toBeGreaterThanOrEqual(400);
  // O intervalo de autoplay é de 2000 ms, mas a deteção por expect.poll tem
  // jitter de ~100-200 ms (intervalo de polling + round-trip do evaluate).
  // O limite inferior precisa ficar abaixo do menor intervalo medido com folga,
  // mantendo a garantia de que o avanço não acumula (nunca fica perto de 400 ms).
  expect(thirdElapsed).toBeGreaterThanOrEqual(1600);
  expect(thirdElapsed).toBeLessThan(4500);
});

test('seta seguinte após o último cartão volta ao primeiro sem retorno visual', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = carousel.getByTestId('featured-products-carousel-viewport');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  for (const target of PRODUCT_LABELS.slice(1)) {
    await carousel.getByRole('button', { name: 'Próximo slide' }).click();
    await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(target);
  }

  const lastScroll = await readScrollLeft(viewport);

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();

  const samples: number[] = [];
  const startTime = Date.now();
  while (Date.now() - startTime < 1400) {
    samples.push(await readScrollLeft(viewport));
    await page.waitForTimeout(50);
  }

  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Qevaryn FieldOps');
  const finalScroll = samples[samples.length - 1];
  const anomalous = samples.filter((sample) => sample < lastScroll - 60 && Math.abs(sample - finalScroll) > 60);
  expect(anomalous).toEqual([]);
});

test('seta anterior no primeiro cartão vai ao último sem retorno visual', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = carousel.getByTestId('featured-products-carousel-viewport');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  // garante que a hidratação terminou para medir o scroll inicial de forma fiável
  const clonePrev = carousel.getByTestId('featured-products-carousel-slide-clone-prev');
  await expect.poll(() => clonePrev.evaluate((node) => (node as HTMLElement).inert)).toBe(true);

  const firstScroll = await readScrollLeft(viewport);

  await carousel.getByRole('button', { name: 'Slide anterior' }).click();

  const samples: number[] = [];
  const startTime = Date.now();
  while (Date.now() - startTime < 1400) {
    samples.push(await readScrollLeft(viewport));
    await page.waitForTimeout(50);
  }

  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Solução personalizada para o seu contexto');
  const finalScroll = samples[samples.length - 1];
  const anomalous = samples.filter((sample) => sample > firstScroll + 60 && Math.abs(sample - finalScroll) > 60);
  expect(anomalous).toEqual([]);
});

test('carrossel de produtos mobile suporta setas, indicadores, teclado e retoma após 2s', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await expect(carousel.locator('[data-testid^="featured-products-carousel-slide-"]')).toHaveCount(6);
  await expect(carousel.getByLabel('Indicadores de posição').locator('button')).toHaveCount(4);
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);

  const viewport = carousel.getByTestId('featured-products-carousel-viewport');
  const before = await readActiveIndicatorLabel(carousel);

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(nextOf(before, PRODUCT_LABELS));

  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(before);

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  // o índice lógico é atualizado de forma eager pela fila; aguarda o render
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).not.toBe(before);
  const selectedAfterInteraction = await readActiveIndicatorLabel(carousel);

  await page.waitForTimeout(600);
  expect(await readActiveIndicatorLabel(carousel)).toBe(selectedAfterInteraction);

  const beforeResume = await readScrollLeft(viewport);
  await page.waitForTimeout(2500);
  const afterResume = await readScrollLeft(viewport);
  expect(afterResume).not.toBe(beforeResume);
});

test('carrossel de produtos avança e recua com setas sem quebrar indicadores', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const startLabel = await readActiveIndicatorLabel(carousel);

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel)).not.toBe(startLabel);

  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel)).toBe(startLabel);
});

test('setas navegam em loop infinito sem dead-end nos dois sentidos', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  // Previous no primeiro → último (loop)
  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Solução personalizada para o seu contexto');

  // Next no último → primeiro (loop)
  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');
});

test('cliques rápidos nas setas mantêm um único card ativo e o dot sincronizado', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  const next = carousel.getByRole('button', { name: 'Próximo slide' });
  await next.click();
  await next.click();
  await next.click();

  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Solução personalizada para o seu contexto');
});

test('clique no CTA do cartão abre o produto', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  await carousel.locator('[data-active="true"]').getByRole('link', { name: 'Ver produto' }).click();
  await expect(page).toHaveURL(/\/produtos\/fieldops$/);
});

test('indicadores e teclado navegam entre cartões e o contador do processo acompanha', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  const clonePrev = carousel.getByTestId('featured-products-carousel-slide-clone-prev');
  await expect.poll(() => clonePrev.evaluate((node) => (node as HTMLElement).inert)).toBe(true);

  await expect(carousel.getByLabel('Indicadores de posição').locator('button')).toHaveCount(4);

  await carousel
    .getByLabel('Indicadores de posição')
    .getByRole('button', { name: 'Ir para Qevaryn Stock & Orders' })
    .click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Stock & Orders');

  const track = carousel.getByTestId('featured-products-carousel-track');
  await track.focus();
  await expect(track).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Solução personalizada para o seu contexto');
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Stock & Orders');
  await page.keyboard.press('Home');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');
  await page.keyboard.press('End');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Solução personalizada para o seu contexto');

  await page.locator('#processo').scrollIntoViewIfNeeded();
  const processCarousel = page.getByTestId('process-carousel');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 5');
  await processCarousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');
});

test('autoplay pausa ao usar uma seta e retoma 2 s depois; nova interação reinicia o tempo', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.locator('#produtos-preview').evaluate((node) => node.scrollIntoView({ block: 'center' }));

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  // a seta avança um cartão e o autoplay fica pausado durante a leitura
  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Hotel Operations');

  // sem double-step: não avança antes do fim da pausa de interação (2000 ms)
  await page.waitForTimeout(1400);
  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Qevaryn Hotel Operations');

  // retoma após 2000 ms → avança para o próximo cartão
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 4500 }).toBe('Ir para Qevaryn Stock & Orders');

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Solução personalizada para o seu contexto');
  await page.waitForTimeout(1400);
  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Solução personalizada para o seu contexto');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 3000 }).toBe('Ir para Qevaryn FieldOps');
});

test('carrossel em destaque não avança com a página escondida e retoma ao voltar', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  // garante que a hidratação terminou (o inert dos clones só é aplicado no cliente)
  const clonePrev = carousel.getByTestId('featured-products-carousel-slide-clone-prev');
  await expect.poll(() => clonePrev.evaluate((node) => (node as HTMLElement).inert)).toBe(true);

  // tira o carrossel do viewport para parar o autoplay antes de esconder
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(200);

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Qevaryn FieldOps');

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 4500 }).toBe('Ir para Qevaryn Hotel Operations');
});

test('carrossel em destaque não avança fora do viewport', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
  expect(await readActiveIndicatorLabel(carousel)).toBe('Ir para Qevaryn FieldOps');
});

test('clones são aria-hidden e inert e não duplicam links acessíveis', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');

  const clonePrev = carousel.getByTestId('featured-products-carousel-slide-clone-prev');
  const cloneNext = carousel.getByTestId('featured-products-carousel-slide-clone-next');
  await expect(clonePrev).toHaveAttribute('aria-hidden', 'true');
  await expect(cloneNext).toHaveAttribute('aria-hidden', 'true');
  await expect.poll(() => clonePrev.evaluate((node) => (node as HTMLElement).inert)).toBe(true);
  await expect.poll(() => cloneNext.evaluate((node) => (node as HTMLElement).inert)).toBe(true);
  await expect.poll(() => clonePrev.locator('a').first().evaluate((node) => node.getAttribute('tabindex'))).toBe('-1');
  await expect.poll(() => cloneNext.locator('a').first().evaluate((node) => node.getAttribute('tabindex'))).toBe('-1');

  await expect(carousel.getByRole('link', { name: 'Ver produto' })).toHaveCount(3);
});

test('carrosséis em destaque não causam overflow horizontal em 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.locator('#processo').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.locator('#empresas').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('credibilidade pausa por hover/foco e retoma aos 2s sem mouseleave ou blur', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const tickerViewport = page.getByTestId('services-ticker-viewport');
  const readScroll = () => readScrollLeft(tickerViewport);

  await page.evaluate(() => {
    document
      .querySelector('[data-testid="services-ticker"]')
      ?.scrollIntoView({ block: 'center' });
  });
  await waitForScrollChange(tickerViewport);

  await ticker.hover();
  const hoverPausedFirst = await readScroll();
  await page.waitForTimeout(500);
  const hoverPausedSecond = await readScroll();
  expect(hoverPausedSecond).toBe(hoverPausedFirst);
  await waitForScrollChange(tickerViewport);
  const hoverResumed = await readScroll();
  expect(hoverResumed).toBeGreaterThanOrEqual(hoverPausedSecond);

  await tickerViewport.focus();
  await expect(tickerViewport).toBeFocused();
  const focusPausedFirst = await readScroll();
  await page.waitForTimeout(500);
  const focusPausedSecond = await readScroll();
  expect(focusPausedSecond).toBe(focusPausedFirst);
  await waitForScrollChange(tickerViewport);
  const focusResumed = await readScroll();
  expect(focusResumed).toBeGreaterThanOrEqual(focusPausedSecond);
});

test('credibilidade mantém-se parada durante a pausa de interação e retoma aos 2 s; hidden pausa', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const tickerViewport = page.getByTestId('services-ticker-viewport');
  const readScroll = () => readScrollLeft(tickerViewport);

  await page.evaluate(() => {
    document
      .querySelector('[data-testid="services-ticker"]')
      ?.scrollIntoView({ block: 'center' });
  });
  await waitForScrollChange(tickerViewport);

  // seta seguinte pausa o autoplay durante a pausa de interação;
  // primeiro aguarda o passo animado terminar de estabilizar
  await ticker.getByRole('button', { name: 'Seguinte' }).click();
  await page.waitForTimeout(600);
  const heldFirst = await readScroll();
  await page.waitForTimeout(1000);
  const heldSecond = await readScroll();
  expect(heldSecond).toBe(heldFirst);

  // o autoplay retoma sozinho após a pausa de interação
  await waitForScrollChange(tickerViewport);
  expect(await readScroll()).toBeGreaterThanOrEqual(heldSecond);

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const hiddenFirst = await readScroll();
  await page.waitForTimeout(500);
  expect(await readScroll()).toBe(hiddenFirst);

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const visibleFirst = await readScroll();
  await page.waitForTimeout(500);
  expect(await readScroll()).toBe(visibleFirst);
  await waitForScrollChange(tickerViewport);
  expect(await readScroll()).toBeGreaterThanOrEqual(visibleFirst);
});

test('hero mantém CTAs principais e sem overflow em 320', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await expect(page.locator('#inicio').getByRole('link', { name: 'Conhecer soluções' })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Falar com a KAVTRIS' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
