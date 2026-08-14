import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const symbolSourcePattern = /kavtris-symbol-dark/;
const founderAlt = 'Gabriel Dias de Souza, Fundador e QA Engineer da KAVTRIS';

async function readRenderedImageMetrics(imageLocator: import('@playwright/test').Locator) {
  await expect.poll(async () => imageLocator.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  return imageLocator.evaluate((image) => {
    const img = image as HTMLImageElement;
    const rect = img.getBoundingClientRect();

    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: rect.width,
      renderedHeight: rect.height,
      naturalRatio: img.naturalWidth / img.naturalHeight,
      renderedRatio: rect.width / rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      objectFit: getComputedStyle(img).objectFit,
      source: img.currentSrc || img.src
    };
  });
}

type BoxEdges = { right: number; bottom: number; left: number; top: number };

function toEdges(box: { x: number; y: number; width: number; height: number }): BoxEdges {
  return {
    left: box.x,
    top: box.y,
    right: box.x + box.width,
    bottom: box.y + box.height
  };
}

function expectNoOverlap(first: BoxEdges, second: BoxEdges) {
  const overlaps = first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
  expect(overlaps).toBe(false);
}

function readPngSize(buffer: Buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    colorType: buffer[25]
  };
}

test('logomarca KAVTRIS aparece no header e no footer sem caixa clara ou quadrado', async ({ page, request }) => {
  await page.goto('/');

  const logoFile = readFileSync('public/brand/kavtris/kavtris-wordmark-dark.png');
  const logoFileSize = readPngSize(logoFile);
  const viewport = page.viewportSize();
  const isMobileViewport = Boolean(viewport && viewport.width < 640);

  expect(logoFile.subarray(1, 4).toString()).toBe('PNG');
  expect(logoFileSize.width).toBe(760);
  expect(logoFileSize.height).toBe(180);
  expect([3, 6]).toContain(logoFileSize.colorType);

  // WEB.1F.2 — the Header/Footer visible brand is the owner-approved web lockup
  // PNG (symbol + KAVTRIS + TECHNOLOGY & CONSULTING). The canonical wordmark
  // asset remains in the repo and is still served.
  const logoResponse = await request.get('/brand/kavtris/kavtris-wordmark-dark.png');
  expect(logoResponse.status()).toBe(200);

  const header = page.getByRole('banner');
  const headerLockup = header.locator('img[src*="kavtris-technology-consulting-lockup"]');
  await expect(headerLockup).toBeVisible();
  await expect(headerLockup).toHaveAttribute('src', /kavtris-technology-consulting-lockup/);
  await expect(headerLockup).toHaveAttribute('alt', '');
  await expect(page.getByText('QV', { exact: true })).toHaveCount(0);
  if (!viewport || viewport.width < 1360) {
    await expect(page.getByTestId('header-network-signature')).toBeHidden();
  } else {
    await expect(page.getByTestId('header-network-signature')).toBeVisible();
  }

  const lockupBox = (await headerLockup.boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };
  expect(lockupBox.x).toBeGreaterThanOrEqual(0);
  expect(lockupBox.x + lockupBox.width).toBeLessThanOrEqual(viewport?.width || 1440);

  // No bright box behind the brand (ancestors stay dark).
  const ancestorBackgrounds = await headerLockup.evaluate((node) => {
    const colors: string[] = [];
    let element = node.parentElement;
    while (element && colors.length < 5) {
      colors.push(getComputedStyle(element).backgroundColor);
      if (element.tagName === 'HEADER' || element.tagName === 'FOOTER') {
        break;
      }
      element = element.parentElement;
    }
    return colors;
  });
  expect(ancestorBackgrounds).not.toContain('rgb(255, 255, 255)');
  expect(ancestorBackgrounds).not.toContain('rgb(248, 248, 246)');

  const navBox = isMobileViewport ? null : await page.getByRole('navigation', { name: 'Navegação principal' }).boundingBox();
  const analysisButtonBox = isMobileViewport
    ? await page.getByRole('banner').getByRole('button', { name: 'Abrir menu' }).boundingBox()
    : await page.getByRole('banner').getByRole('link', { name: 'Pedir demonstração' }).boundingBox();
  expect(analysisButtonBox).not.toBeNull();
  if (navBox) {
    expectNoOverlap(toEdges(lockupBox), toEdges(navBox));
  }
  expectNoOverlap(toEdges(lockupBox), toEdges(analysisButtonBox!));
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport?.width || 1440);

  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  const footerLockup = page.getByRole('contentinfo').locator('img[src*="kavtris-technology-consulting-lockup"]');
  await expect(footerLockup).toBeVisible();
  await expect(footerLockup).toHaveAttribute('src', /kavtris-technology-consulting-lockup/);
  await expect(footerLockup).toHaveAttribute('alt', /Technology & Consulting/i);
  await expect(page.getByRole('contentinfo').getByText('Integrante da Rede Qualidade é Vida')).toBeVisible();
  await expect(page.getByRole('contentinfo').getByAltText('Rede Qualidade é Vida')).toBeVisible();
});

test('hero usa símbolo KAVTRIS em destaque e não mostra dashboard operacional', async ({ page, request }) => {
  await page.goto('/');

  const symbolFile = readFileSync('public/brand/kavtris/kavtris-symbol-dark.png');
  const symbolFileSize = readPngSize(symbolFile);
  const symbolResponse = await request.get('/brand/kavtris/kavtris-symbol-dark.png');
  const heroVisual = page.getByTestId('hero-brand-visual');
  const symbol = heroVisual.getByAltText('Símbolo KAVTRIS');

  expect(symbolFile.subarray(1, 4).toString()).toBe('PNG');
  expect(symbolFileSize.width).toBe(760);
  expect(symbolFileSize.height).toBe(760);
  expect(symbolResponse.status()).toBe(200);
  await expect(page.locator('#inicio').getByText('Painel Operacional')).toHaveCount(0);
  await expect(page.locator('#inicio').getByText('MVP', { exact: true })).toHaveCount(0);
  await expect(page.locator('#inicio').getByText('Fluxos', { exact: true })).toHaveCount(0);
  await expect(heroVisual.getByText('Pedido recebido')).toHaveCount(0);
  await expect(heroVisual.getByText('Relatório atualizado')).toHaveCount(0);
  await expect(symbol).toBeVisible();
  await expect(symbol).toHaveAttribute('src', symbolSourcePattern);

  const metrics = await readRenderedImageMetrics(symbol);
  const minSymbolWidth = (page.viewportSize()?.width ?? 0) < 768 ? 180 : 340;
  expect(metrics.renderedWidth).toBeGreaterThanOrEqual(minSymbolWidth);
  expect(metrics.renderedWidth).toBeLessThanOrEqual(560);
  expect(Math.abs(metrics.naturalRatio - metrics.renderedRatio)).toBeLessThan(0.03);
  expect(metrics.objectFit).toBe('contain');
});

test('fotografia aprovada do fundador aparece em /sobre sem fallback e mantém cartão compacto', async ({ page }) => {
  await page.goto('/sobre');

  const founderSection = page.getByTestId('about-founder-card');
  const photo = founderSection.getByAltText(founderAlt);

  await expect(photo).toBeVisible();
  await expect(photo).toHaveAttribute('src', /gabriel/);
  await expect(founderSection.getByText('GS', { exact: true })).toHaveCount(0);
  await expect.poll(async () => photo.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  const photoMetrics = await photo.evaluate((image) => {
    const img = image as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: rect.width,
      renderedHeight: rect.height,
      objectFit: getComputedStyle(img).objectFit
    };
  });

  expect(photoMetrics.naturalWidth).toBeGreaterThan(0);
  expect(photoMetrics.naturalHeight).toBeGreaterThan(0);
  expect(photoMetrics.renderedWidth).toBeGreaterThan(72);
  expect(photoMetrics.renderedHeight).toBeGreaterThan(72);
  expect(photoMetrics.objectFit).toBe('cover');

  const cardHeight = await page.getByTestId('about-founder-card').boundingBox();
  const viewport = page.viewportSize();
  expect(cardHeight?.height).toBeLessThanOrEqual(viewport && viewport.width < 640 ? 540 : 380);
});

test('header e cartão do fundador continuam responsivos no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/sobre');

  await expect(page.getByRole('banner').locator('img[src*="kavtris-technology-consulting-lockup"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await expect(page.getByTestId('about-founder-card').getByAltText(founderAlt)).toBeVisible();
  await expect(page.getByTestId('about-founder-card').getByText('GS', { exact: true })).toHaveCount(0);

  const founderBox = await page.getByTestId('about-founder-card').boundingBox();
  expect(founderBox?.height).toBeLessThanOrEqual(540);
});

test('logomarca mobile mantém proporção, não sobrepõe ações e resiste ao menu aberto', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const banner = page.getByRole('banner');
  const headerLockup = banner.locator('img[src*="kavtris-technology-consulting-lockup"]');
  const initialMetrics = (await headerLockup.boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };
  const menuButtonBox = await banner.getByRole('button', { name: 'Abrir menu' }).boundingBox();

  expect(initialMetrics.width).toBeGreaterThanOrEqual(100);
  expect(initialMetrics.width).toBeLessThanOrEqual(240);
  expect(initialMetrics.x + initialMetrics.width).toBeLessThanOrEqual(390);
  expect(menuButtonBox).not.toBeNull();
  expectNoOverlap(toEdges(initialMetrics), toEdges(menuButtonBox!));
  await expect(banner.getByRole('link', { name: 'Pedir demonstração' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();
  await expect(page.getByTestId('mobile-network-signature')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pedir demonstração' })).toBeVisible();
  await expect(page.getByRole('banner').getByAltText('Rede Qualidade é Vida')).toHaveCount(0);
  const openMenuMetrics = (await headerLockup.boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };

  expect(Math.abs(openMenuMetrics.x - initialMetrics.x)).toBeLessThan(1);
  expect(Math.abs(openMenuMetrics.y - initialMetrics.y)).toBeLessThan(1);
  expect(Math.abs(openMenuMetrics.width - initialMetrics.width)).toBeLessThan(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('link da logomarca leva ao início da página', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await page.getByLabel(/KAVTRIS — Technology & Consulting/i).click();

  await expect.poll(async () => page.evaluate(() => window.location.hash)).toBe('#inicio');
});

test('nenhuma imagem carregada retorna dimensões zero ou erro', async ({ page, request }) => {
  const failedImages: string[] = [];
  page.on('response', (response) => {
    const url = response.url();
    if (/\.(png|jpe?g|webp|svg)(\?|$)/i.test(url) && response.status() >= 400) {
      failedImages.push(`${response.status()} ${url}`);
    }
  });

  await page.goto('/');
  const images = page.locator('img');
  const imageCount = await images.count();

  for (let index = 0; index < imageCount; index += 1) {
    const image = images.nth(index);
    const isRendered = await image.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);

      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    });

    if (!isRendered) {
      continue;
    }

    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await image.evaluate((element) => (element as HTMLImageElement).decode().catch(() => undefined));
  }

  const imageSources = await page.evaluate(() =>
    Array.from(new Set(Array.from(document.images).map((image) => image.currentSrc || image.src).filter(Boolean)))
  );

  for (const src of imageSources) {
    const response = await request.get(src);
    expect(response.status(), src).toBeLessThan(400);
  }

  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((image) => {
        const rect = image.getBoundingClientRect();
        const isRendered = rect.width > 0 && rect.height > 0;

        return isRendered && image.currentSrc && (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0);
      })
      .map((image) => image.currentSrc)
  );

  expect(failedImages).toEqual([]);
  expect(brokenImages).toEqual([]);
});

test('gera screenshots da integração visual final', async ({ page }, testInfo) => {
  for (const viewport of [
    { name: 'desktop-1440x900', width: 1440, height: 900 },
    { name: 'laptop-1280x800', width: 1280, height: 800 },
    { name: 'tablet-768x1024', width: 768, height: 1024 },
    { name: 'mobile-390x844', width: 390, height: 844 }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await page.screenshot({ path: testInfo.outputPath(`phase4-${viewport.name}.png`), fullPage: true });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase4-header-desktop.png') });
  await page.getByTestId('network-preview').screenshot({ path: testInfo.outputPath('phase4-network-desktop.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase4-header-mobile.png') });
  await page.locator('#rede').scrollIntoViewIfNeeded();
  await page.getByTestId('network-preview').screenshot({ path: testInfo.outputPath('phase4-network-mobile.png') });
});

test('gera screenshots específicas da logomarca transparente', async ({ page }, testInfo) => {
  for (const viewport of [
    { name: 'logo-header-1920.png', width: 1920, height: 900 },
    { name: 'logo-header-1440.png', width: 1440, height: 900 },
    { name: 'logo-header-1280.png', width: 1280, height: 800 },
    { name: 'logo-header-768.png', width: 768, height: 1024 },
    { name: 'logo-header-430.png', width: 430, height: 932 },
    { name: 'logo-header-390.png', width: 390, height: 844 },
    { name: 'logo-header-360.png', width: 360, height: 800 }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await page.getByRole('banner').screenshot({ path: testInfo.outputPath(viewport.name) });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  await page.getByRole('contentinfo').screenshot({ path: testInfo.outputPath('logo-footer-desktop.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  await page.getByRole('contentinfo').screenshot({ path: testInfo.outputPath('logo-footer-mobile.png') });
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.getByRole('banner').screenshot({ path: testInfo.outputPath('logo-mobile-menu-open.png') });
});
