import { test } from '@playwright/test';
import { qaViewports } from '../../shared/data/viewports';
import { waitForTrustImages } from '../../shared/helpers/images';
import { revealWholePage } from '../../shared/helpers/reveal';

test('generates full-page visual audit screenshots', async ({ page }, testInfo) => {
  for (const viewport of [
    { ...qaViewports.desktopWide, screenshotName: 'desktop-1920x1080' },
    { ...qaViewports.desktop, screenshotName: 'desktop-1440x900' },
    { ...qaViewports.laptop, screenshotName: 'laptop-1280x800' },
    { ...qaViewports.tabletLandscape, screenshotName: 'tablet-landscape-1024x768' },
    { ...qaViewports.tablet, screenshotName: 'tablet-768x1024' },
    { ...qaViewports.mobile430, screenshotName: 'mobile-430x932' },
    { ...qaViewports.mobile414, screenshotName: 'mobile-414x896' },
    { ...qaViewports.mobileStandard, screenshotName: 'mobile-390x844' },
    { ...qaViewports.mobile375, screenshotName: 'mobile-375x812' },
    { ...qaViewports.mobile360, screenshotName: 'mobile-360x800' }
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await waitForTrustImages(page);
    // WEB.1D — reveal every section once before the full-page capture, so the
    // audit screenshot reflects the final visible state, then return to top.
    await revealWholePage(page);
    await page.screenshot({
      path: testInfo.outputPath(`phase6-full-${viewport.screenshotName}.png`),
      fullPage: true
    });
  }
});

test('generates desktop and mobile section screenshots for visual audit', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: qaViewports.desktop.width, height: qaViewports.desktop.height });
  await page.goto('/');
  await revealWholePage(page);
  await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase6-header-desktop.png') });
  await page.locator('#inicio').screenshot({ path: testInfo.outputPath('phase6-hero-desktop.png') });
  await page.locator('#processo').screenshot({ path: testInfo.outputPath('phase6-how-we-work-desktop.png') });
  await page.locator('#produtos-preview').screenshot({ path: testInfo.outputPath('phase6-products-preview-desktop.png') });
  await waitForTrustImages(page);
  await page.locator('#rede').screenshot({ path: testInfo.outputPath('phase6-trust-desktop.png') });
  await page.locator('#contacto').screenshot({ path: testInfo.outputPath('phase6-contact-desktop.png') });

  await page.setViewportSize({ width: qaViewports.mobileStandard.width, height: qaViewports.mobileStandard.height });
  await page.goto('/');
  await revealWholePage(page);
  await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase6-header-mobile.png') });
  await page.locator('#inicio').screenshot({ path: testInfo.outputPath('phase6-hero-mobile.png') });
  await page.getByTestId('hero-brand-visual').screenshot({ path: testInfo.outputPath('phase6-hero-brand-mobile.png') });
  await page.locator('#processo').screenshot({ path: testInfo.outputPath('phase6-how-we-work-mobile.png') });
  await page.locator('#produtos-preview').screenshot({ path: testInfo.outputPath('phase6-products-preview-mobile.png') });
  await page.locator('#processo').screenshot({ path: testInfo.outputPath('phase6-process-mobile.png') });
  await waitForTrustImages(page);
  await page.locator('#rede').screenshot({ path: testInfo.outputPath('phase6-trust-mobile.png') });
  await page.locator('#contacto').screenshot({ path: testInfo.outputPath('phase6-contact-mobile.png') });
  await page.getByRole('contentinfo').screenshot({ path: testInfo.outputPath('phase6-footer-mobile.png') });
});
