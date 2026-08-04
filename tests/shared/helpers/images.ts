import { expect, type Page } from '@playwright/test';

export async function waitForTrustImages(page: Page) {
  const trust = page.locator('#sobre');

  await trust.scrollIntoViewIfNeeded();
  await expect.poll(async () => trust.evaluate((section) => {
    const renderedImages = Array.from(section.querySelectorAll('img')).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    return renderedImages.length;
  })).toBeGreaterThanOrEqual(1);

  await expect.poll(async () => trust.evaluate((section) => {
    const renderedImages = Array.from(section.querySelectorAll('img')).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    return renderedImages.every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0);
  })).toBe(true);

  await trust.evaluate(async (section) => {
    const renderedImages = Array.from(section.querySelectorAll('img')).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    await Promise.all(renderedImages.map((image) => image.decode().catch(() => undefined)));
  });
}
