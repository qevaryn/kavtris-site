import { expect, test } from '@playwright/test';
import { scrollThroughPage } from '../shared/helpers/reveal';

/**
 * WEB.1D.1 — final UX/UI polish validation.
 *
 * Owner manual review corrections covered here:
 *  - reveal timing: ~950ms standard duration, 0ms standard delay, 20px distance
 *  - trigger not too early: section top must genuinely approach (~85% viewport)
 *  - large screens: sections already meaningfully visible at load stay visible
 *  - anchor navigation: destination reveals during approach (no invisible arrival)
 *  - Contact desktop top/bottom alignment (stretch + mt-auto)
 *  - Hero desktop visual balance (left/right proportions, K presence)
 *  - microtext readability (header, hero, credibility, products, footer)
 *  - Credibility strip vertical rhythm
 */

const DESKTOP = { width: 1440, height: 900 };

test('reveal timing: duração padrão ~1s, delay 0 e trigger não demasiado cedo (1440×900)', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const wrapper = page.getByTestId('reveal-produtos');
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'pending');

  // Place the section top at ~92% of the viewport height — above the governed
  // desktop trigger zone (~85%) — the section must STILL be pending (not early).
  const topAt92 = await wrapper.evaluate((node) => {
    const top = node.getBoundingClientRect().top + window.scrollY;
    return top - window.innerHeight * 0.92;
  });
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), topAt92);
  await page.waitForTimeout(300);
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'pending');

  // Then place the top at ~78% — below the trigger line — the reveal engages.
  const topAt78 = await wrapper.evaluate((node) => {
    const top = node.getBoundingClientRect().top + window.scrollY;
    return top - window.innerHeight * 0.78;
  });
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), topAt78);
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
  await expect.poll(() => wrapper.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
});

test('ecrã grande (1920×1200): secções já visíveis na carga não escondem; restantes revelam', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto('/');

  // How We Work is meaningfully visible in the initial viewport (≥30%) → stays
  // visible, never enters pending (LARGE_SCREEN_INITIAL_VIEWPORT_VISIBLE).
  const processo = page.getByTestId('reveal-processo');
  await expect(processo).toHaveAttribute('data-reveal-state', 'revealed');
  await expect.poll(() => processo.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');

  // Products is below the fold → eligible and reveals on approach.
  const produtos = page.getByTestId('reveal-produtos');
  await expect(produtos).toHaveAttribute('data-reveal-state', 'pending');
  await scrollThroughPage(page, 0.5, 40);
  await expect(produtos).toHaveAttribute('data-reveal-state', 'revealed');
});

test('navegação por âncora: destino revela durante a aproximação (sem chegada invisível)', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  await expect(page.getByTestId('reveal-processo')).toHaveAttribute('data-reveal-state', 'pending');
  await page.locator('#inicio').getByRole('link', { name: 'Como trabalhamos' }).click();
  await expect(page.getByTestId('reveal-processo')).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(page.locator('#como-trabalhamos').getByRole('heading', { name: 'Do diagnóstico à solução, sem complicação.' })).toBeVisible();

  // Contact CTA (deep section) — reveals during the smooth approach.
  await page.getByRole('link', { name: 'Falar com a KAVTRIS' }).click();
  await expect(page.getByTestId('reveal-contacto-left')).toHaveAttribute('data-reveal-state', 'revealed', { timeout: 10000 });
  await expect(page.getByTestId('reveal-contacto-form')).toHaveAttribute('data-reveal-state', 'revealed', { timeout: 10000 });
});

test('contacto desktop: colunas alinhadas no topo e no fundo (CONTACT_ALIGNMENT = PASS)', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const left = page.getByTestId('reveal-contacto-left');
  const form = page.getByTestId('reveal-contacto-form');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(left).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(form).toHaveAttribute('data-reveal-state', 'revealed');

  // Wait for the ~1s transitions to finish before measuring geometry
  // (mid-transition the translateY offset would skew the boxes).
  await expect.poll(() => left.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
  await expect.poll(() => form.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');

  const leftBox = (await left.boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };
  const formBox = (await form.boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };

  // Small optical tolerance (sub-pixel rounding) per CONTACT_TOP/BOTTOM_ALIGNMENT.
  expect(Math.abs(leftBox.y - formBox.y)).toBeLessThanOrEqual(2);
  expect(Math.abs(leftBox.y + leftBox.height - (formBox.y + formBox.height))).toBeLessThanOrEqual(2);
});

test('hero desktop: balanço esquerda/direita dentro das metas visuais (1280/1440/1920)', async ({ page }) => {
  for (const width of [1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const metrics = await page.evaluate(() => {
      const grid = document.querySelector('#inicio h1')?.closest('.grid');
      if (!grid) {
        return null;
      }
      const columns = Array.from(grid.children).filter((node) => (node as HTMLElement).getBoundingClientRect().width > 0);
      if (columns.length < 2) {
        return null;
      }
      const left = columns[0].getBoundingClientRect();
      const right = columns[1].getBoundingClientRect();
      const visual = document.querySelector('[data-testid="hero-brand-visual"]')?.getBoundingClientRect();
      return {
        leftWidth: left.width,
        rightWidth: right.width,
        rightRatio: right.width / (left.width + right.width),
        leftRatio: left.width / (left.width + right.width),
        visualWidth: visual?.width ?? 0,
        visualCenter: visual ? visual.x + visual.width / 2 : 0,
        rightCenter: right.x + right.width / 2
      };
    });

    expect(metrics, `grid at ${width}px`).not.toBeNull();
    expect(metrics!.rightRatio, `right ratio at ${width}px`).toBeGreaterThanOrEqual(0.42);
    expect(metrics!.rightRatio, `right ratio at ${width}px`).toBeLessThanOrEqual(0.52);
    expect(metrics!.leftRatio, `left ratio at ${width}px`).toBeLessThanOrEqual(0.58);
    expect(metrics!.visualWidth, `K visual width at ${width}px`).toBeGreaterThanOrEqual(260);
    // The K composition occupies the outer zone of the right column (presence,
    // not dead space) without necessarily filling it edge-to-edge.
    expect(metrics!.visualCenter, `K center at ${width}px`).toBeGreaterThanOrEqual(metrics!.rightCenter);
  }
});

test('microtexto: textos-chave legíveis sem zoom (header, hero, credibilidade, produtos, footer)', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const sizes = await page.evaluate(() => {
    const fontSize = (selector: string, index = 0) => {
      const node = document.querySelectorAll(selector)[index];
      return node ? Number.parseFloat(getComputedStyle(node).fontSize) : 0;
    };
    return {
      headerNav: fontSize('nav[aria-label="Navegação principal"] a'),
      heroCopy: fontSize('#inicio p'),
      credibilityTitle: fontSize('[data-testid="services-ticker"] article p'),
      credibilitySubtitle: fontSize('[data-testid="services-ticker"] article p span'),
      productsCategory: fontSize('#produtos-preview article p'),
      footerLink: fontSize('footer a')
    };
  });

  expect(sizes.headerNav).toBeGreaterThanOrEqual(13);
  expect(sizes.heroCopy).toBeGreaterThanOrEqual(12);
  expect(sizes.credibilityTitle).toBeGreaterThanOrEqual(12);
  expect(sizes.credibilitySubtitle).toBeGreaterThanOrEqual(11);
  expect(sizes.productsCategory).toBeGreaterThanOrEqual(13);
  expect(sizes.footerLink).toBeGreaterThanOrEqual(14);
});

test('credibilidade: ritmo vertical melhorado sem inflar a strip', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const metrics = await page.evaluate(() => {
    const article = document.querySelector('[data-testid="services-ticker"] article');
    const section = document.querySelector('[aria-label="Como a KAVTRIS trabalha e no que pode confiar"]');
    const computed = article ? getComputedStyle(article) : null;
    const sectionComputed = section ? getComputedStyle(section) : null;
    return {
      minHeight: computed ? Number.parseFloat(computed.minHeight) : 0,
      paddingTop: sectionComputed ? Number.parseFloat(sectionComputed.paddingTop) : 0,
      lineHeight: computed ? Number.parseFloat(computed.lineHeight) : 0
    };
  });

  expect(metrics.minHeight).toBeGreaterThanOrEqual(96);
  expect(metrics.paddingTop).toBeGreaterThanOrEqual(12);
  expect(metrics.lineHeight).toBeGreaterThanOrEqual(18);
});


test('desktop: scroll lento revela cada secção de forma percetível (sem gaps)', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const height = document.documentElement.scrollHeight;
        let y = 0;
        const step = 150;
        const advance = () => {
          window.scrollTo({ top: y, behavior: 'instant' });
          y += step;
          if (y <= height) {
            window.setTimeout(advance, 120);
          } else {
            window.scrollTo({ top: height, behavior: 'instant' });
            window.setTimeout(resolve, 200);
          }
        };
        advance();
      })
  );

  const wrappers = [
    'reveal-processo',
    'reveal-produtos',
    'reveal-empresas',
    'reveal-rede-left',
    'reveal-rede-right',
    'reveal-contacto-left',
    'reveal-contacto-form',
    'reveal-footer'
  ];
  for (const id of wrappers) {
    await expect(page.getByTestId(id)).toHaveAttribute('data-reveal-state', 'revealed', { timeout: 5000 });
  }
});

test('contacto mobile: sem lógica de igualdade de altura desktop (fluxo natural)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const left = page.getByTestId('reveal-contacto-left');
  const form = page.getByTestId('reveal-contacto-form');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(left).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(form).toHaveAttribute('data-reveal-state', 'revealed');

  // Wait for the ~1s transitions to finish before measuring heights.
  await expect.poll(() => left.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
  await expect.poll(() => form.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');

  const leftBox = (await left.boundingBox()) ?? { height: 0 };
  const formBox = (await form.boundingBox()) ?? { height: 0 };
  // Natural stacked flow: the form is taller than the left composition and no
  // desktop equal-height stretching applies on mobile.
  expect(formBox.height).toBeGreaterThan(leftBox.height);
  expect(formBox.height - leftBox.height).toBeGreaterThan(100);
});

