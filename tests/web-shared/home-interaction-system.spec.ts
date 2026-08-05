import { expect, test } from '@playwright/test';

test('ticker de serviços mantém duplicação visual escondida e pausa por hover/foco no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const mainTrack = page.getByTestId('services-ticker-main');
  const tickerTrack = page.getByTestId('services-ticker-track');
  const duplicateTrack = page.getByTestId('services-ticker-duplicate');

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

  await ticker.focus();
  await page.keyboard.press('Tab');
  await expect(injectedMainButton).toBeFocused();

  await page.locator('header').first().click();
  await expect(injectedMainButton).not.toBeFocused();

  await expect
    .poll(() => tickerTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('running');

  await ticker.hover();
  await expect
    .poll(() => tickerTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('paused');

  await ticker.focus();
  await expect(ticker).toBeFocused();
  await expect
    .poll(() => tickerTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('paused');
});

test('motion budget mantém apenas um autoplay ativo e transfere quando o dono deixa viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const servicesTrack = page.getByTestId('services-ticker-track');
  const enterpriseTrack = page.getByTestId('enterprise-capabilities-ticker-track');

  await expect
    .poll(() => servicesTrack.evaluate((element) => getComputedStyle(element).animationName))
    .not.toBe('none');

  await expect
    .poll(() => enterpriseTrack.evaluate((element) => getComputedStyle(element).animationName))
    .toBe('none');

  await page.locator('#empresas').scrollIntoViewIfNeeded();

  await expect
    .poll(() => servicesTrack.evaluate((element) => getComputedStyle(element).animationName))
    .toBe('none');

  await expect
    .poll(() => enterpriseTrack.evaluate((element) => getComputedStyle(element).animationName), { timeout: 8000 })
    .not.toBe('none');
});

test('ticker e carrosséis respeitam reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('services-static-reduced')).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toHaveCount(0);

  const productsTrack = page.getByTestId('featured-products-carousel-track');

  const initialProductsScroll = await productsTrack.evaluate((element) => element.scrollLeft);

  await expect
    .poll(() => productsTrack.evaluate((element) => element.scrollLeft), { timeout: 8500 })
    .toBe(initialProductsScroll);
});

test('produtos no desktop exibem grelha comparável sem carrossel', async ({ page }) => {
  await page.goto('/');

  const desktopGrid = page.getByTestId('featured-products-desktop-grid');
  await expect(desktopGrid).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Solução personalizada para o seu contexto' })).toBeVisible();
  await expect(page.getByTestId('featured-products-carousel')).toBeHidden();
});

test('carrossel de produtos mobile suporta setas, indicadores, teclado e pausa após interação', async ({ page }) => {
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

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  const selectedAfterInteraction = await carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');

  await expect
    .poll(() =>
      carousel
        .getByLabel('Indicadores de posição')
        .locator('button[aria-pressed="true"]')
        .first()
        .getAttribute('aria-label'),
      { timeout: 9000 }
    )
    .toBe(selectedAfterInteraction);
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

test('processo no desktop usa grade estática sem autoplay', async ({ page }) => {
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const desktopGrid = page.getByTestId('process-desktop-grid');
  await expect(desktopGrid).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(desktopGrid.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();
});

test('credibilidade no desktop usa apresentação estática sem ticker', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('services-static-desktop')).toBeVisible();
  await expect(page.getByTestId('services-static-grid').getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(page.getByTestId('services-static-grid').getByText('Evitar falhas e melhorar processos').first()).toBeVisible();
  await expect(page.getByTestId('services-static-grid').getByText('Sistemas para computador e telemóvel').first()).toBeVisible();
  await expect(page.getByTestId('services-static-grid').getByText('Ligar as ferramentas da empresa').first()).toBeVisible();
  await expect(page.getByTestId('services-static-grid').getByText('Suporte, correções e melhorias').first()).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toBeHidden();
});

test('empresas no desktop mostra quatro capacidades sem details ou ticker', async ({ page }) => {
  await page.goto('/');
  await page.locator('#empresas').scrollIntoViewIfNeeded();

  const desktopGrid = page.getByTestId('enterprise-capabilities-desktop-grid');
  await expect(desktopGrid).toBeVisible();
  await expect(desktopGrid.getByText('Segurança e acessos')).toBeVisible();
  await expect(desktopGrid.getByText('Qualidade e testes')).toBeVisible();
  await expect(desktopGrid.getByText('Integrações e arquitetura')).toBeVisible();
  await expect(desktopGrid.getByText('Suporte e continuidade')).toBeVisible();

  await expect(page.getByTestId('enterprise-capabilities-mobile-details')).toBeHidden();
  await expect(page.getByTestId('enterprise-capabilities-ticker')).toBeHidden();
});

test('hero mantém CTAs principais e sem overflow em 320', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await expect(page.locator('#inicio').getByRole('link', { name: 'Encontrar uma solução' })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver produtos' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
