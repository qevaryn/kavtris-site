import { expect, test } from '@playwright/test';
import { revealWholePage, scrollThroughPage, scrollToTop } from '../shared/helpers/reveal';

/**
 * WEB.1D — validation suite for the one-time scroll reveal & motion system.
 *
 * Covers the governed contract:
 *  - REVEAL_ONCE / REHIDE_ON_SCROLL_UP = NO / REPLAY_ON_SECOND_ENTRY = NO
 *  - Contact desktop staged reveal (left first, form ≤120ms)
 *  - Network two-part reveal (≤120ms)
 *  - prefers-reduced-motion → content immediately visible
 *  - fast scroll → independent immediate reveals, no queued cascade
 *  - upward scroll persistence + second-down no replay
 *  - reveal causes no layout shift (transform/opacity only)
 *  - carousel keeps working after reveal (state preserved during scroll)
 *  - hash deep-link → anchored section not left invisible
 *  - zero new console/hydration errors
 */

const DESKTOP = { width: 1440, height: 900 };
const REVEAL_WRAPPERS = [
  'reveal-como-funciona',
  'reveal-rede-left',
  'reveal-rede-right',
  'reveal-contacto-left',
  'reveal-contacto-form',
  'reveal-footer'
];

test('reveal acontece uma vez: pending → revealed → persiste ao subir → não repete', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const wrapper = page.getByTestId('reveal-como-funciona');
  // Eligible pre-reveal state: hydrated, pending, hidden but laid out.
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'pending');
  await expect.poll(() => wrapper.evaluate((node) => getComputedStyle(node).opacity)).toBe('0');

  // Governed standard timing (WEB.1D.1): ~950ms duration, no delay, 20px distance.
  const styles = await wrapper.evaluate((node) => {
    const computed = getComputedStyle(node);
    return {
      duration: computed.transitionDuration,
      delay: computed.transitionDelay,
      transform: computed.transform
    };
  });
  // computed transition-duration may be a per-property list ("0.95s, 0.95s").
  expect(styles.duration.split(',')[0].trim()).toBe('0.95s');
  expect(styles.delay).toBe('0s');
  expect(styles.transform).not.toBe('none');

  const heightBefore = await page.evaluate(() => document.documentElement.scrollHeight);
  const widthBefore = await page.evaluate(() => document.documentElement.scrollWidth);

  // First entry → reveal once.
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
  await expect.poll(() => wrapper.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
  await expect(wrapper).toHaveClass(/kavtris-reveal--revealed/);

  // Scroll up → stays revealed (REHIDE_ON_SCROLL_UP = NO).
  await scrollToTop(page);
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');

  // Scroll down again → no replay (REPLAY_ON_SECOND_ENTRY = NO).
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
  await expect.poll(() => wrapper.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');

  // transform/opacity only → no layout shift.
  const heightAfter = await page.evaluate(() => document.documentElement.scrollHeight);
  const widthAfter = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(heightAfter).toBe(heightBefore);
  expect(widthAfter).toBe(widthBefore);
});

test('contacto desktop: esquerda revela primeiro; formulário recebe stagger governado (200–250ms)', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const left = page.getByTestId('reveal-contacto-left');
  const form = page.getByTestId('reveal-contacto-form');

  await expect(left).toHaveAttribute('data-reveal-state', 'pending');
  await expect(form).toHaveAttribute('data-reveal-state', 'pending');
  await expect(form).toHaveClass(/kavtris-reveal--delay-short/);

  // Governed staged-right variant: 220ms delay + 800ms duration → the right
  // column starts shortly after the left and completes around the ~1s mark.
  const styles = await form.evaluate((node) => {
    const computed = getComputedStyle(node);
    return { delay: computed.transitionDelay, duration: computed.transitionDuration };
  });
  expect(styles.delay).toBe('0.22s');
  expect(styles.duration.split(',')[0].trim()).toBe('0.8s');

  await form.scrollIntoViewIfNeeded();
  await expect(left).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(form).toHaveAttribute('data-reveal-state', 'revealed');
});

test('rede: progressão em duas partes com stagger governado (200–250ms) no desktop', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const left = page.getByTestId('reveal-rede-left');
  const right = page.getByTestId('reveal-rede-right');
  // 'pending' implies the reveal classes are armed (mounted).
  await expect(right).toHaveAttribute('data-reveal-state', 'pending');
  await expect(right).toHaveClass(/kavtris-reveal--delay-short/);
  const delay = await right.evaluate((node) => getComputedStyle(node).transitionDelay);
  expect(delay).toBe('0.22s');

  await right.scrollIntoViewIfNeeded();
  await expect(left).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(right).toHaveAttribute('data-reveal-state', 'revealed');
});

test('prefers-reduced-motion: conteúdo imediatamente visível, sem estado pendente', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  for (const id of REVEAL_WRAPPERS) {
    const wrapper = page.getByTestId(id);
    await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
    await expect.poll(() => wrapper.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
  }

  // Existing reduced-motion surfaces stay intact: Hero visual + credibility static grid.
  await expect(page.getByTestId('hero-brand-visual')).toBeVisible();
  await expect(page.getByTestId('services-static-reduced')).toBeVisible();
});

test('fast scroll: todas as secções revelam imediatamente, sem filas', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  await scrollThroughPage(page, 0.5, 40);

  for (const id of REVEAL_WRAPPERS) {
    await expect(page.getByTestId(id)).toHaveAttribute('data-reveal-state', 'revealed', { timeout: 5000 });
  }
});

test('subir ao topo mantém tudo revelado; segunda descida não repete', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');

  const processo = page.getByTestId('reveal-como-funciona');
  await processo.scrollIntoViewIfNeeded();
  await expect(processo).toHaveAttribute('data-reveal-state', 'revealed');

  // top → contact
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('reveal-contacto-left')).toHaveAttribute('data-reveal-state', 'revealed');

  // contact → top: revealed sections persist.
  await scrollToTop(page);
  await expect(processo).toHaveAttribute('data-reveal-state', 'revealed');

  // second descent: no replay (state is one-way).
  await processo.scrollIntoViewIfNeeded();
  await expect(processo).toHaveAttribute('data-reveal-state', 'revealed');
  await expect.poll(() => processo.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
});

test('como funciona revela uma vez e permanece funcional durante scroll (sem reset)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const wrapper = page.getByTestId('reveal-como-funciona');
  await page.locator('#como-funciona').scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');

  // Os carrosséis antigos já não existem na Home (WEB.1F.5).
  await expect(page.getByTestId('featured-products-carousel')).toHaveCount(0);

  // Scroll away and back: the reveal stays revealed (one-time).
  await scrollToTop(page);
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
});

test('deep link para #contacto não deixa a secção invisível', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/#contacto');
  await expect(page.getByTestId('reveal-contacto-left')).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(page.getByTestId('reveal-contacto-form')).toHaveAttribute('data-reveal-state', 'revealed');
});

test('sem erros de consola nem hydration com o sistema de reveal', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  await revealWholePage(page);

  for (const id of REVEAL_WRAPPERS) {
    await expect(page.getByTestId(id)).toHaveAttribute('data-reveal-state', 'revealed');
  }
  expect(errors).toEqual([]);
});

test('tablet 768/820: reveal funciona com layout empilhado (sem stagger oculto)', async ({ page }) => {
  for (const width of [768, 820]) {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto('/');

    const form = page.getByTestId('reveal-contacto-form');
    const right = page.getByTestId('reveal-rede-right');
    // Stacked below lg: delay token reset to 0ms (checked once armed/pending).
    await expect(form).toHaveAttribute('data-reveal-state', 'pending');
    await expect(right).toHaveAttribute('data-reveal-state', 'pending');
    expect(await form.evaluate((node) => getComputedStyle(node).transitionDelay)).toBe('0s');
    expect(await right.evaluate((node) => getComputedStyle(node).transitionDelay)).toBe('0s');

    await revealWholePage(page);
    for (const id of REVEAL_WRAPPERS) {
      await expect(page.getByTestId(id)).toHaveAttribute('data-reveal-state', 'revealed');
    }
  }
});

test('1024: reveal de Como funciona funciona no breakpoint desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/');

  const wrapper = page.getByTestId('reveal-como-funciona');
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-reveal-state', 'revealed');
});

