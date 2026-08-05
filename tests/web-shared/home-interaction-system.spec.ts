import { expect, test, type Locator, type Page } from '@playwright/test';

async function readActiveIndicatorLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

async function clockAutoplayCadence(page: Page, carousel: Locator) {
  const readLabel = () => readActiveIndicatorLabel(carousel);

  const initial = await readLabel();
  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  const afterClick = await readLabel();
  expect(afterClick).not.toBe(initial);

  await page.clock.runFor(1800);
  expect(await readLabel()).toBe(afterClick);

  await page.clock.runFor(200);
  await page.clock.runFor(100);
  const atResume = await readLabel();
  expect(atResume).not.toBe(afterClick);

  await page.clock.runFor(2800);
  expect(await readLabel()).toBe(atResume);
  await page.clock.runFor(200);
  expect(await readLabel()).not.toBe(atResume);
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

  const runningStart = await tickerViewport.evaluate((element) => element.scrollLeft);
  await expect
    .poll(() => tickerViewport.evaluate((element) => element.scrollLeft), { timeout: 5000 })
    .not.toBe(runningStart);

  await ticker.hover();
  await page.waitForTimeout(400);
  const pausedFirst = await tickerViewport.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(600);
  const pausedSecond = await tickerViewport.evaluate((element) => element.scrollLeft);
  expect(pausedSecond).toBe(pausedFirst);

  await tickerViewport.focus();
  await expect(tickerViewport).toBeFocused();
  await page.waitForTimeout(400);
  const focusedFirst = await tickerViewport.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(600);
  const focusedSecond = await tickerViewport.evaluate((element) => element.scrollLeft);
  expect(focusedSecond).toBe(focusedFirst);
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

  const initialTickerScroll = await tickerViewport.evaluate((element) => element.scrollLeft);
  await expect
    .poll(() => tickerViewport.evaluate((element) => element.scrollLeft), { timeout: 5000 })
    .not.toBe(initialTickerScroll);

  const productsInitial = await readActiveIndicatorLabel(productsCarousel);
  await expect
    .poll(() => readActiveIndicatorLabel(productsCarousel), { timeout: 3500 })
    .toBe(productsInitial);

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await expect
    .poll(() => readActiveIndicatorLabel(productsCarousel), { timeout: 11000 })
    .not.toBe(productsInitial);

  const processInitial = await readActiveIndicatorLabel(processCarousel);
  await expect
    .poll(() => readActiveIndicatorLabel(processCarousel), { timeout: 5000 })
    .toBe(processInitial);

  await page.locator('#processo').scrollIntoViewIfNeeded();
  await expect
    .poll(() => readActiveIndicatorLabel(processCarousel), { timeout: 13000 })
    .not.toBe(processInitial);

  const enterpriseInitial = await readActiveIndicatorLabel(enterpriseCarousel);
  await page.locator('#empresas').scrollIntoViewIfNeeded();
  await expect
    .poll(() => readActiveIndicatorLabel(enterpriseCarousel), { timeout: 12000 })
    .not.toBe(enterpriseInitial);
});

test('ticker e carrosséis respeitam reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('services-static-reduced')).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toHaveCount(0);

  const productsViewport = page.getByTestId('featured-products-carousel-viewport');
  const processViewport = page.getByTestId('process-carousel-viewport');
  const enterpriseViewport = page.getByTestId('enterprise-capabilities-carousel-viewport');

  const initialProductsScroll = await productsViewport.evaluate((element) => element.scrollLeft);
  const initialProcessScroll = await processViewport.evaluate((element) => element.scrollLeft);
  const initialEnterpriseScroll = await enterpriseViewport.evaluate((element) => element.scrollLeft);

  await expect
    .poll(() => productsViewport.evaluate((element) => element.scrollLeft), { timeout: 8500 })
    .toBe(initialProductsScroll);
  await expect
    .poll(() => processViewport.evaluate((element) => element.scrollLeft), { timeout: 10500 })
    .toBe(initialProcessScroll);
  await expect
    .poll(() => enterpriseViewport.evaluate((element) => element.scrollLeft), { timeout: 9500 })
    .toBe(initialEnterpriseScroll);
});

test('produtos no desktop usam carrossel com autoplay e foco não exige blur para retomar', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');
  await expect(carousel).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Solução personalizada para o seu contexto' })).toBeVisible();

  const initialSelection = await readActiveIndicatorLabel(carousel);
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 11000 }).not.toBe(initialSelection);

  await track.focus();
  const focusedSelection = await readActiveIndicatorLabel(carousel);
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 4500 }).not.toBe(focusedSelection);
  await expect(track).toBeFocused();
});

test('carrossel de produtos mobile suporta setas, indicadores, teclado e retoma por inatividade', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');

  await expect(carousel.locator('[data-testid^="featured-products-carousel-slide-"]')).toHaveCount(4);
  await expect(carousel.getByLabel('Indicadores de posição').locator('button')).toHaveCount(4);

  const initialIndex = await carousel.getByLabel('Indicadores de posição').locator('button[aria-pressed="true"]').count();
  expect(initialIndex).toBe(1);

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  const selectedAfterInteraction = await readActiveIndicatorLabel(carousel);

  await page.waitForTimeout(600);
  expect(await readActiveIndicatorLabel(carousel)).toBe(selectedAfterInteraction);

  await expect
    .poll(() => readActiveIndicatorLabel(carousel), { timeout: 4500 })
    .not.toBe(selectedAfterInteraction);
});

test('carrossel de produtos segue cadência de autoplay 3s e pausa por inatividade de 2s', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = page.getByTestId('featured-products-carousel-viewport');
  const readLabel = () => readActiveIndicatorLabel(carousel);

  await clockAutoplayCadence(page, carousel);

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await readLabel();
  await page.clock.runFor(1500);
  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  const afterSecond = await readLabel();
  await page.clock.runFor(1500);
  expect(await readLabel()).toBe(afterSecond);
  await page.clock.runFor(500);
  await page.clock.runFor(100);
  expect(await readLabel()).not.toBe(afterSecond);

  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
  });
  const track = page.getByTestId('featured-products-carousel-track');
  await track.focus();
  const focusedStart = await readLabel();
  await page.clock.runFor(1900);
  expect(await readLabel()).toBe(focusedStart);
  await page.clock.runFor(100);
  await page.clock.runFor(100);
  expect(await readLabel()).not.toBe(focusedStart);
  await expect(track).toBeFocused();

  const box = await viewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }

  await page.mouse.move(1, 1);
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
  const hoverStart = await readLabel();
  await page.clock.runFor(1900);
  expect(await readLabel()).toBe(hoverStart);
  await page.clock.runFor(100);
  await page.clock.runFor(100);
  expect(await readLabel()).not.toBe(hoverStart);

  await page.mouse.down();
  const held = await readLabel();
  await page.clock.runFor(2500);
  await page.clock.runFor(100);
  expect(await readLabel()).toBe(held);
  await page.mouse.up();
  await page.clock.runFor(1900);
  expect(await readLabel()).toBe(held);
  await page.clock.runFor(100);
  await page.clock.runFor(100);
  expect(await readLabel()).not.toBe(held);

  await page.clock.runFor(3100);
  await page.clock.runFor(100);
  const beforeHidden = await readLabel();
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.runFor(6100);
  expect(await readLabel()).toBe(beforeHidden);

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.runFor(1900);
  expect(await readLabel()).toBe(beforeHidden);
  await page.clock.runFor(100);
  await page.clock.runFor(100);
  expect(await readLabel()).not.toBe(beforeHidden);

  const resumed = await readLabel();
  await page.clock.runFor(2800);
  expect(await readLabel()).toBe(resumed);
  await page.clock.runFor(200);
  expect(await readLabel()).not.toBe(resumed);
});

test('carrossel de processo mantém ordem, contador e controles manuais', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');

  await expect(processCarousel.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();

  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 4');
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 4');

  await processCarousel.getByTestId('process-carousel-track').focus();
  await page.keyboard.press('ArrowRight');
  await expect(processCarousel.getByTestId('process-carousel-counter')).not.toHaveText('1 de 4');
});

test('processo no desktop usa carrossel com autoplay', async ({ page }) => {
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');
  await expect(processCarousel).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();

  const processInitial = await readActiveIndicatorLabel(processCarousel);
  await expect.poll(() => readActiveIndicatorLabel(processCarousel), { timeout: 13000 }).not.toBe(processInitial);
});

test('credibilidade no desktop usa ticker contínuo', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  await expect(ticker).toBeVisible();
  await expect(ticker.getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(ticker.getByText('Evitar falhas e melhorar processos').first()).toBeVisible();
  await expect(ticker.getByText('Sistemas para computador e telemóvel').first()).toBeVisible();
  await expect(ticker.getByText('Ligar as ferramentas da empresa').first()).toBeVisible();
  await expect(ticker.getByText('Suporte, correções e melhorias').first()).toBeVisible();
});

test('empresas no desktop mostra quatro capacidades em carrossel com autoplay', async ({ page }) => {
  await page.goto('/');
  await page.locator('#empresas').scrollIntoViewIfNeeded();

  const enterpriseCarousel = page.getByTestId('enterprise-capabilities-carousel');
  await expect(enterpriseCarousel).toBeVisible();
  await expect(enterpriseCarousel.getByText('Segurança e acessos')).toBeVisible();
  await expect(enterpriseCarousel.getByText('Qualidade e testes')).toBeVisible();
  await expect(enterpriseCarousel.getByText('Integrações e arquitetura')).toBeVisible();
  await expect(enterpriseCarousel.getByText('Suporte e continuidade')).toBeVisible();

  const enterpriseInitial = await readActiveIndicatorLabel(enterpriseCarousel);
  await expect.poll(() => readActiveIndicatorLabel(enterpriseCarousel), { timeout: 12000 }).not.toBe(enterpriseInitial);
});

test('carrosséis de processo e empresas seguem cadência de 3s e pausa por inatividade de 2s', async ({ page }) => {
  const configs = [
    { testId: 'process-carousel', section: '#processo' },
    { testId: 'enterprise-capabilities-carousel', section: '#empresas' }
  ];

  await page.clock.install();
  for (const config of configs) {
    await page.goto('/');
    await page.locator(config.section).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await clockAutoplayCadence(page, page.getByTestId(config.testId));
  }
});

test('carrossel de produtos faz loop circular com controles sem quebrar a ordem', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const startLabel = await readActiveIndicatorLabel(carousel);

  for (let i = 0; i < 4; i += 1) {
    await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  }
  await expect.poll(() => readActiveIndicatorLabel(carousel)).toBe(startLabel);

  for (let i = 0; i < 4; i += 1) {
    await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  }
  await expect.poll(() => readActiveIndicatorLabel(carousel)).toBe(startLabel);
});

test('carrossel de produtos pode ser arrastado com o rato e faz snap para o slide vizinho', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = page.getByTestId('featured-products-carousel-viewport');
  const before = await readActiveIndicatorLabel(carousel);

  const box = await viewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }

  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.15, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();

  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).not.toBe(before);
});

test('credibilidade pausa por hover/foco e retoma aos 2s sem mouseleave ou blur', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const tickerViewport = page.getByTestId('services-ticker-viewport');
  const readScroll = () => tickerViewport.evaluate((element) => element.scrollLeft);

  await page.evaluate(() => {
    document
      .querySelector('[data-testid="services-ticker"]')
      ?.scrollIntoView({ block: 'center' });
  });
  await expect.poll(() => readScroll(), { timeout: 4000 }).toBeGreaterThan(0);

  await ticker.hover();
  const hoverPausedFirst = await readScroll();
  await page.waitForTimeout(500);
  const hoverPausedSecond = await readScroll();
  expect(hoverPausedSecond).toBe(hoverPausedFirst);
  await expect.poll(() => readScroll(), { timeout: 4000 }).not.toBe(hoverPausedSecond);
  const hoverResumed = await readScroll();
  expect(hoverResumed).toBeGreaterThanOrEqual(hoverPausedSecond);

  await tickerViewport.focus();
  await expect(tickerViewport).toBeFocused();
  const focusPausedFirst = await readScroll();
  await page.waitForTimeout(500);
  const focusPausedSecond = await readScroll();
  expect(focusPausedSecond).toBe(focusPausedFirst);
  await expect.poll(() => readScroll(), { timeout: 4000 }).not.toBe(focusPausedSecond);
  const focusResumed = await readScroll();
  expect(focusResumed).toBeGreaterThanOrEqual(focusPausedSecond);
});

test('credibilidade mantém-se parada durante pointerdown e hidden e retoma aos 2s na mesma posição', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  const readScroll = () => tickerViewport.evaluate((element) => element.scrollLeft);

  await page.evaluate(() => {
    document
      .querySelector('[data-testid="services-ticker"]')
      ?.scrollIntoView({ block: 'center' });
  });
  await expect.poll(() => readScroll(), { timeout: 4000 }).toBeGreaterThan(0);

  const box = await tickerViewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  const heldFirst = await readScroll();
  await page.waitForTimeout(2500);
  const heldSecond = await readScroll();
  expect(heldSecond).toBe(heldFirst);

  await page.mouse.up();
  const releaseFirst = await readScroll();
  await page.waitForTimeout(500);
  const releaseSecond = await readScroll();
  expect(releaseSecond).toBe(releaseFirst);
  await expect.poll(() => readScroll(), { timeout: 4000 }).not.toBe(releaseSecond);
  expect(await readScroll()).toBeGreaterThanOrEqual(releaseSecond);

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
  await expect.poll(() => readScroll(), { timeout: 4000 }).not.toBe(visibleFirst);
  expect(await readScroll()).toBeGreaterThanOrEqual(visibleFirst);
});

test('hero mantém CTAs principais e sem overflow em 320', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await expect(page.locator('#inicio').getByRole('link', { name: 'Encontrar uma solução' })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver produtos' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
