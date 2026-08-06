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

test('produtos no desktop usam carrossel contínuo sem troca por cartão', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');
  const viewport = page.getByTestId('featured-products-carousel-viewport');
  await expect(carousel).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Solução personalizada para o seu contexto' })).toBeVisible();

  const initialScroll = await readScrollLeft(viewport);
  await page.waitForTimeout(250);
  const nextScroll = await readScrollLeft(viewport);
  expect(nextScroll).not.toBe(initialScroll);
  await page.waitForTimeout(1000);
  const laterScroll = await readScrollLeft(viewport);
  expect(laterScroll).toBeGreaterThan(nextScroll);

  await track.focus();
  const focusedSelection = await readActiveIndicatorLabel(carousel);
  await page.waitForTimeout(2200);
  expect(await readActiveIndicatorLabel(carousel)).toBe(focusedSelection);
  await expect(track).toBeFocused();
});

test('carrossel de produtos mobile suporta setas, indicadores, teclado e retoma contínua após 2s', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await expect(carousel.locator('[data-testid^="featured-products-carousel-slide-"]')).toHaveCount(6);
  await expect(carousel.getByLabel('Indicadores de posição').locator('button')).toHaveCount(4);

  const initialIndex = await carousel.getByLabel('Indicadores de posição').locator('button[aria-pressed="true"]').count();
  expect(initialIndex).toBe(1);

  const viewport = carousel.getByTestId('featured-products-carousel-viewport');
  await expect
    .poll(() => readScrollLeft(viewport), { timeout: 4000 })
    .not.toBe(await readScrollLeft(viewport));

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
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

test('credibilidade mantém-se parada durante pointerdown e hidden e retoma aos 2s na mesma posição', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  const readScroll = () => readScrollLeft(tickerViewport);

  await page.evaluate(() => {
    document
      .querySelector('[data-testid="services-ticker"]')
      ?.scrollIntoView({ block: 'center' });
  });
  await waitForScrollChange(tickerViewport);

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
  await waitForScrollChange(tickerViewport);
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
  await waitForScrollChange(tickerViewport);
  expect(await readScroll()).toBeGreaterThanOrEqual(visibleFirst);
});

test('hero mantém CTAs principais e sem overflow em 320', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await expect(page.locator('#inicio').getByRole('link', { name: 'Encontrar uma solução' })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver produtos' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
