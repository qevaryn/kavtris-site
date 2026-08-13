import { expect, test, type Locator } from '@playwright/test';

/**
 * WEB.1B + WEB.1F.5 — Home interaction regression.
 *
 * WEB.1F.5 removed the old process/products/engineering carousels from the
 * homepage by owner decision. The protected credibility loop (ticker) and the
 * simplified journey remain covered here.
 */

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

  // Click the header's non-interactive gap (between the brand lockup and the
  // mobile menu button) to move focus off the injected ticker button.
  await page.locator('header').first().click({ position: { x: 260, y: 36 } });
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

test('ticker respeita reduced motion com grelha estática', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('services-static-reduced')).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toHaveCount(0);
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

test('home: sem carrosséis antigos e hero mantém CTAs principais sem overflow em 320', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver como funciona' })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Falar com a KAVTRIS' })).toBeVisible();

  // WEB.1F.5 — os carrosséis antigos foram removidos por decisão do dono.
  await expect(page.getByTestId('process-carousel')).toHaveCount(0);
  await expect(page.getByTestId('featured-products-carousel')).toHaveCount(0);
  await expect(page.getByTestId('enterprise-capabilities-carousel')).toHaveCount(0);

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
