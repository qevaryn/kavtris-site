import type { Page } from '@playwright/test';

/**
 * WEB.1D — helpers for scroll-reveal tests and screenshot/axe coverage.
 *
 * `scrollThroughPage` walks the page in bounded steps so that every section
 * actually crosses the viewport and its one-time IntersectionObserver reveal
 * fires (a single giant jump would skip sections entirely — IO only reports
 * state changes, and elements that never intersect stay pending).
 */
export async function scrollThroughPage(page: Page, stepRatio = 0.5, settleMs = 40): Promise<void> {
  // Wait until at least one reveal wrapper has been armed by the client
  // (hydration + one frame). Without this, a fast scroll could run before the
  // IntersectionObservers exist and sections would stay pending forever.
  await page.waitForFunction(() => {
    const node = document.querySelector('[data-reveal-state="pending"], [data-reveal-state="revealed"]');
    return Boolean(node);
  });

  await page.evaluate(
    ({ stepRatio: ratio, settleMs: settle }) =>
      new Promise<void>((resolve) => {
        const height = document.documentElement.scrollHeight;
        const step = Math.max(240, Math.floor(window.innerHeight * ratio));
        let y = 0;
        const advance = () => {
          window.scrollTo({ top: y, behavior: 'instant' });
          y += step;
          if (y <= height) {
            window.setTimeout(advance, settle);
          } else {
            window.scrollTo({ top: height, behavior: 'instant' });
            window.setTimeout(resolve, settle);
          }
        };
        advance();
      }),
    { stepRatio, settleMs }
  );
}

export async function scrollToTop(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

/** Reveals every scroll-reveal wrapper and returns to the top, ready for full-page captures. */
export async function revealWholePage(page: Page): Promise<void> {
  await scrollThroughPage(page);
  await scrollToTop(page);
  await page.waitForTimeout(450);
}
