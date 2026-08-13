import { expect, test } from '@playwright/test';
import { scrollToTop } from '../shared/helpers/reveal';

/**
 * WEB.1E — brand meaning + header/footer brand lockup validation.
 *
 *  - Header/Footer: owner-approved web lockup PNG (KAVTRIS + TECHNOLOGY &
 *    CONSULTING in one cohesive image); accessible label on the logo link
 *  - Meaning section: heading, exactly 7 principles (K A V T R I S), English
 *    prominent, Portuguese secondary, positioned after Contact / before Footer
 *  - Governance: KAVTRIS is NOT an acronym (no "stands for"/"acronym" wording)
 *  - Mobile: no page overflow; all seven reachable via the snap track
 *  - Reveal: existing one-time system preserved; reduced-motion immediate
 */

test('header: lockup web PNG de marca (KAVTRIS + TECHNOLOGY & CONSULTING)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const header = page.locator('header');
  const lockup = header.locator('img[src*="kavtris-technology-consulting-lockup"]');

  // WEB.1F.2 — the visible brand is ONE cohesive owner-approved PNG
  // (symbol + KAVTRIS wordmark + TECHNOLOGY & CONSULTING underneath).
  await expect(lockup).toBeVisible();
  await expect(lockup).toHaveAttribute('src', /kavtris-technology-consulting-lockup/);
  await expect(lockup).toHaveAttribute('alt', '');

  // Accessible brand name lives on the logo link (single clean announcement —
  // no duplicated screen-reader output for the visible PNG).
  const brandLink = header.getByLabel(/KAVTRIS — Technology & Consulting/i);
  await expect(brandLink).toHaveAttribute('href', '/#inicio');

  // No duplicated visible HTML descriptor or wordmark beside the PNG.
  await expect(header.getByTestId('brand-descriptor')).toHaveCount(0);
  await expect(header.getByText('TECHNOLOGY & CONSULTING', { exact: false })).toHaveCount(0);

  // It is brand identity, not navigation text.
  await expect(header.getByRole('navigation').getByText(/KAVTRIS/i)).toHaveCount(0);
});

test('footer: mesmo lockup web PNG + alt descritivo, bloco compacto', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const footer = page.getByRole('contentinfo');
  const lockup = footer.locator('img[src*="kavtris-technology-consulting-lockup"]');
  await expect(lockup).toBeVisible();
  await expect(lockup).toHaveAttribute('src', /kavtris-technology-consulting-lockup/);
  await expect(lockup).toHaveAttribute('alt', /KAVTRIS — Technology & Consulting/i);

  // Same web lockup source as the Header (HEADER_FOOTER_ASSET_MATCH).
  const headerSrc = await page.locator('header img[src*="kavtris-technology-consulting-lockup"]').getAttribute('src');
  const footerSrc = await lockup.getAttribute('src');
  expect(footerSrc).toBe(headerSrc);

  // WEB.1F — the identity block remains compact (descriptor lives inside the PNG).
  const box = (await lockup.boundingBox()) ?? { width: 0 };
  expect(box.width).toBeLessThanOrEqual(230);

  // No duplicated visible HTML descriptor.
  await expect(footer.getByTestId('brand-descriptor')).toHaveCount(0);
});

test('meaning: heading + exatamente 7 princípios com ordem e valores corretos', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('#significado').scrollIntoViewIfNeeded();

  await expect(page.getByRole('heading', { name: /meaning behind/i })).toBeVisible();
  await expect(page.getByText('Sete princípios que representam a forma como criamos tecnologia.')).toBeVisible();

  const grid = page.getByTestId('kavtris-principles-grid');
  await expect(grid).toBeVisible();

  const letters = await grid.locator('ol li > span').allTextContents();
  expect(letters).toEqual(['K', 'A', 'V', 'T', 'R', 'I', 'S']);

  const english = await grid.locator('ol li p:first-of-type').allTextContents();
  expect(english).toEqual(['Knowledge', 'Adaptability', 'Vision', 'Trust', 'Results', 'Innovation', 'Simplicity']);

  const pt = await grid.locator('ol li p:last-of-type').allTextContents();
  expect(pt).toEqual([
    'Conhecimento que orienta.',
    'Adaptamo-nos à realidade.',
    'Visão com propósito.',
    'Confiança em cada etapa.',
    'Resultados que importam.',
    'Inovação com utilidade.',
    'Simples para funcionar.'
  ]);

  // Exactly 7 principles per variant (mobile track + desktop system).
  await expect(grid.locator('ol li')).toHaveCount(7);
  await expect(page.getByTestId('kavtris-principles-track').locator('article')).toHaveCount(7);
});

test('meaning: princípios legíveis a distância normal de leitura (EN ≥14px, PT ≥13px)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('#significado').scrollIntoViewIfNeeded();

  const sizes = await page.evaluate(() => {
    const li = document.querySelector('#significado ol li');
    const en = li?.querySelector('p:first-of-type');
    const pt = li?.querySelector('p:last-of-type');
    return {
      en: en ? Number.parseFloat(getComputedStyle(en).fontSize) : 0,
      pt: pt ? Number.parseFloat(getComputedStyle(pt).fontSize) : 0
    };
  });
  expect(sizes.en).toBeGreaterThanOrEqual(14);
  expect(sizes.pt).toBeGreaterThanOrEqual(13);
});

test('governance: KAVTRIS não é apresentado como acrónimo', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const text = await page.evaluate(() => document.body.innerText);
  expect(text).not.toMatch(/KAVTRIS stands for/i);
  expect(text).not.toMatch(/KAVTRIS is an acronym/i);
  expect(text).not.toMatch(/acrónimo|acronimo/i);
  expect(text).not.toMatch(/KAVTRIS significa/i);
  expect(text).not.toMatch(/each letter of KAVTRIS/i);
});

test('mobile: sem overflow de página e os 7 princípios acessíveis via track', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  const track = page.getByTestId('kavtris-principles-track');
  await expect(track).toBeVisible();

  // First principle visible; the track continues (swipe/keyboard reachable).
  await expect(track.getByText('Knowledge', { exact: true })).toBeVisible();
  const scrollable = await track.evaluate((node) => node.scrollWidth > node.clientWidth);
  expect(scrollable).toBe(true);

  // Scroll to the end → the final principle (S / Simplicity) is reachable.
  await track.evaluate((node) => {
    node.scrollLeft = node.scrollWidth;
  });
  await expect(track.getByText('Simplicity', { exact: true })).toBeVisible();
  await expect(track.getByText('S', { exact: true })).toBeVisible();
});

test('reveal one-time preservado para a secção de significado', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const wrapper = page.getByTestId('reveal-significado');
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'pending');

  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');

  await scrollToTop(page);
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
});

test('reduced motion: secção e princípios imediatamente visíveis', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // Desktop viewport: the desktop system is the visible variant.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByTestId('reveal-significado')).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(page.locator('#significado ol li').first()).toHaveCSS('opacity', '1');

  // Mobile viewport: the snap track is the visible variant.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByTestId('reveal-significado')).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(page.getByTestId('kavtris-principles-track').locator('article').first()).toHaveCSS('opacity', '1');
});

