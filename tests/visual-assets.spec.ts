import { expect, test } from '@playwright/test';

const founderAlt = 'Gabriel Dias de Souza, QA Engineer e fundador da Qualidade é Vida Tech';

test('logomarca final aparece no header e no footer sem o quadrado QV antigo', async ({ page }) => {
  await page.goto('/');

  const headerLogo = page.getByRole('banner').getByAltText('Qualidade é Vida Tech');
  const footerLogo = page.getByRole('contentinfo').getByAltText('Qualidade é Vida Tech');

  await expect(headerLogo).toBeVisible();
  await expect(footerLogo).toBeVisible();
  await expect(headerLogo).toHaveAttribute('src', /logo-qualidade-e-vida-tech/);
  await expect(footerLogo).toHaveAttribute('src', /logo-qualidade-e-vida-tech/);
  await expect(page.getByText('QV', { exact: true })).toHaveCount(0);

  for (const logo of [headerLogo, footerLogo]) {
    const box = await logo.boundingBox();
    expect(box?.width).toBeGreaterThan(120);
    expect(box?.height).toBeGreaterThan(35);

    const ratio = await logo.evaluate((image) => {
      const img = image as HTMLImageElement;
      const rect = img.getBoundingClientRect();
      return {
        natural: img.naturalWidth / img.naturalHeight,
        rendered: rect.width / rect.height
      };
    });

    expect(Math.abs(ratio.natural - ratio.rendered)).toBeLessThan(0.05);
  }
});

test('fotografia aprovada do fundador aparece sem fallback e mantém cartão compacto', async ({ page }) => {
  await page.goto('/');
  await page.locator('#sobre').scrollIntoViewIfNeeded();

  const founderSection = page.locator('#sobre');
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

  const cardHeight = await page.locator('#sobre > div > div').boundingBox();
  const viewport = page.viewportSize();
  expect(cardHeight?.height).toBeLessThanOrEqual(viewport && viewport.width < 640 ? 520 : 300);
});

test('header e cartão do fundador continuam responsivos no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('banner').getByAltText('Qualidade é Vida Tech')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await expect(page.locator('#sobre').getByAltText(founderAlt)).toBeVisible();
  await expect(page.locator('#sobre').getByText('GS', { exact: true })).toHaveCount(0);

  const founderBox = await page.locator('#sobre > div > div').boundingBox();
  expect(founderBox?.height).toBeLessThanOrEqual(520);
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
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.75, 300);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });

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
  await page.locator('#sobre > div').screenshot({ path: testInfo.outputPath('phase4-founder-desktop.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase4-header-mobile.png') });
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await page.locator('#sobre > div').screenshot({ path: testInfo.outputPath('phase4-founder-mobile.png') });
});
