import { test } from '@playwright/test';
import { overflowViewports } from '../shared/data/viewports';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';

test.describe('shared responsive overflow', () => {
  for (const viewport of overflowViewports) {
    test(`homepage has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      await expectNoHorizontalOverflow(page);
    });
  }
});
