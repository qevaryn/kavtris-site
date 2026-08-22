import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';

test('mobile catalog has no horizontal overflow', async ({ page }) => {
  await page.goto('/produtos?modo=sistemas');

  await expectNoHorizontalOverflow(page);
  await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible();

  const fieldOpsCard = page.getByTestId('product-card').filter({ hasText: 'FieldOps' });
  await fieldOpsCard.scrollIntoViewIfNeeded();
  const fieldOpsImage = fieldOpsCard.getByRole('img', { name: /Interface do FieldOps com agenda de serviços/i });
  await expect(fieldOpsImage).toBeVisible();
  await expect.poll(async () => fieldOpsImage.evaluate((image: HTMLImageElement) => (
    image.complete &&
    image.naturalWidth > 0 &&
    image.naturalHeight > 0 &&
    image.currentSrc.includes('fieldops-catalog-v1.webp')
  ))).toBe(true);

  const opsCard = page.getByTestId('product-card').filter({ has: page.getByRole('heading', { name: 'KAVTRIS Ops', exact: true }) });
  await opsCard.scrollIntoViewIfNeeded();
  await expect(opsCard.getByRole('img', { name: /Interface do KAVTRIS Ops num portátil/i })).toBeVisible();
  const visualBox = await opsCard.getByTestId('product-card-visual').boundingBox();
  expect(visualBox).not.toBeNull();
  expect(visualBox!.width / visualBox!.height).toBeCloseTo(16 / 9, 1);
  await expectNoHorizontalOverflow(page);
});

test('mobile catalog shows one-column cards and buttons stay inside viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/produtos?modo=sistemas');

  // Positional contract is intentional: this test verifies the stacking
  // geometry of the first two catalog cards at 320px, not a specific product.
  const firstCard = page.getByTestId('product-card').first();
  const secondCard = page.getByTestId('product-card').nth(1);
  const firstBox = await firstCard.boundingBox();
  const secondBox = await secondCard.boundingBox();

  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(Math.round(secondBox!.y)).toBeGreaterThan(Math.round(firstBox!.y + firstBox!.height - 4));

  for (const link of await firstCard.getByRole('link').all()) {
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }
});
