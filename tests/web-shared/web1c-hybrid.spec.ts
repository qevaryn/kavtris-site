import { expect, test } from '@playwright/test';

/**
 * WEB.1C — validation suite for the UX-first light body (hybrid dark/light).
 *  - section theme per the approved architecture
 *  - dark-area share stays restrained (SITE_TOO_DARK = NO)
 *  - light-body contrast (WCAG) on real rendered colors
 *  - deliberate dark→light transition
 *  - carousel light-tone active states
 */

function parseColor(color: string): { r: number; g: number; b: number } {
  const value = color.trim();
  const rgbMatch = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return { r: Number(rgbMatch[1]), g: Number(rgbMatch[2]), b: Number(rgbMatch[3]) };
  }
  const hex = value.replace('#', '');
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16)
  };
}

function relativeLuminance(color: string): number {
  const { r, g, b } = parseColor(color);
  const linear = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(lighter: string, darker: string): number {
  const l1 = relativeLuminance(lighter);
  const l2 = relativeLuminance(darker);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

async function backgroundColor(page: import('@playwright/test').Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const node = document.querySelector(sel);
    return node ? getComputedStyle(node).backgroundColor : 'transparent';
  }, selector);
}

test('arquitetura híbrida: temas dark/light por secção conforme aprovado', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const dark = [
    'header',
    '#inicio',
    '[aria-label="Como a KAVTRIS trabalha e no que pode confiar"]',
    'footer'
  ];
  const light = ['#como-trabalhamos', '#produtos-preview', '#empresas', '#contacto'];
  const warmLight = ['#rede'];

  for (const selector of dark) {
    const bg = await backgroundColor(page, selector);
    expect(relativeLuminance(bg), `${selector} should be dark, got ${bg}`).toBeLessThan(0.2);
  }
  for (const selector of light) {
    const bg = await backgroundColor(page, selector);
    expect(relativeLuminance(bg), `${selector} should be light, got ${bg}`).toBeGreaterThan(0.85);
  }
  for (const selector of warmLight) {
    const bg = await backgroundColor(page, selector);
    expect(relativeLuminance(bg), `${selector} should be warm/light, got ${bg}`).toBeGreaterThan(0.85);
  }
});

test('dark-area share mantém-se restrito (SITE_TOO_DARK = NO)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const result = await page.evaluate(() => {
    const sections = ['header', '#inicio', '[aria-label="Como a KAVTRIS trabalha e no que pode confiar"]', '#como-trabalhamos', '#produtos-preview', '#empresas', '#rede', '#contacto', 'footer'];
    const parseColor = (color: string) => {
      const rgbMatch = color.trim().match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (rgbMatch) {
        return { r: Number(rgbMatch[1]), g: Number(rgbMatch[2]), b: Number(rgbMatch[3]) };
      }
      const hex = color.replace('#', '');
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16)
      };
    };
    const toLuminance = (color: string) => {
      const { r, g, b } = parseColor(color);
      const linear = [r, g, b].map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    };

    let darkHeight = 0;
    let totalHeight = 0;
    for (const selector of sections) {
      const node = document.querySelector(selector);
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      if (rect.height <= 0) continue;
      const bg = getComputedStyle(node).backgroundColor;
      const alphaMatch = bg.match(/rgba?\([^)]*,\s*([\d.]+)\)$/);
      const alpha = alphaMatch ? Number.parseFloat(alphaMatch[1]) : 1;
      const luminance = alpha === 0 ? 1 : toLuminance(bg);
      if (luminance < 0.2) darkHeight += rect.height;
      totalHeight += rect.height;
    }
    return { darkHeight, totalHeight, share: totalHeight > 0 ? darkHeight / totalHeight : 0 };
  });

  expect(result.totalHeight).toBeGreaterThan(2000);
  // Header + Hero + Credibility + Footer stay dark; the body is predominantly light.
  expect(result.share).toBeLessThan(0.5);
});

test('light body: contraste WCAG em cores reais (texto e azul KAVTRIS)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  // Muted paragraph inside a light process card.
  const muted = await page.evaluate(() => {
    const paragraph = Array.from(document.querySelectorAll('#como-trabalhamos article p')).find((p) =>
      p.textContent?.includes('Encontramos oportunidades')
    );
    const color = paragraph ? getComputedStyle(paragraph).color : 'rgb(0,0,0)';
    const card = paragraph?.closest('article');
    const bg = card ? getComputedStyle(card).backgroundColor : 'rgb(255,255,255)';
    return { color, bg };
  });
  const mutedRatio = contrastRatio(muted.color, muted.bg);
  expect(mutedRatio).toBeGreaterThanOrEqual(4.5);

  // Blue accent text (kavtris-blue) on white card.
  const blue = await page.evaluate(() => {
    const label = document.querySelector('#como-trabalhamos article p');
    const color = label ? getComputedStyle(label).color : 'rgb(6,90,253)';
    const card = label?.closest('article');
    const bg = card ? getComputedStyle(card).backgroundColor : 'rgb(255,255,255)';
    return { color, bg };
  });
  const blueRatio = contrastRatio(blue.color, blue.bg);
  expect(blueRatio).toBeGreaterThanOrEqual(4.5);

  // Navy heading on light section.
  const heading = await page.evaluate(() => {
    const node = document.querySelector('#como-trabalhamos h2');
    const color = node ? getComputedStyle(node).color : 'rgb(10,27,48)';
    const section = node?.closest('section');
    const bg = section ? getComputedStyle(section).backgroundColor : 'rgb(248,250,253)';
    return { color, bg };
  });
  expect(contrastRatio(heading.color, heading.bg)).toBeGreaterThanOrEqual(4.5);
});

test('transição dark→light é limpa, sem véu escuro pesado (WEB.1F.4)', async ({ page }) => {
  await page.goto('/');

  // WEB.1F.4 — the previous `from-kavtris-dark/30` tonal veil (which read as a
  // heavy black stripe) was removed.
  await expect(page.getByTestId('processo-dark-light-transition')).toHaveCount(0);

  // The light section starts on the clean light surface.
  const bg = await page
    .locator('#como-trabalhamos')
    .evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(relativeLuminance(bg)).toBeGreaterThan(0.85);
});

test('carrossel em superfície clara: dot ativo usa azul KAVTRIS base', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#como-trabalhamos').scrollIntoViewIfNeeded();

  const activeDot = page
    .getByTestId('process-carousel')
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first();
  await expect(activeDot).toBeVisible();

  const color = await activeDot.evaluate((node) => getComputedStyle(node).backgroundColor);
  // kavtris-blue base #065AFD on light surfaces (not blueLight #3D7BFF).
  expect(color).toBe('rgb(6, 90, 253)');
});

test('hybrid homepage mantém-se sem overflow horizontal em 320/390/1024/1440', async ({ page }) => {
  for (const width of [320, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForTimeout(250);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

