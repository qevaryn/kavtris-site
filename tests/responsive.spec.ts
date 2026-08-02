import { test, expect } from '@playwright/test';

async function waitForExperienceImages(page: import('@playwright/test').Page) {
  const experience = page.locator('#experiencia');

  await experience.scrollIntoViewIfNeeded();
  await expect.poll(async () => experience.evaluate((section) => {
    const renderedImages = Array.from(section.querySelectorAll('img')).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    return renderedImages.length;
  })).toBe(3);

  await expect.poll(async () => experience.evaluate((section) => {
    const renderedImages = Array.from(section.querySelectorAll('img')).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    return renderedImages.every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0);
  })).toBe(true);

  await experience.evaluate(async (section) => {
    const renderedImages = Array.from(section.querySelectorAll('img')).filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    await Promise.all(renderedImages.map((image) => image.decode().catch(() => undefined)));
  });
}

test.describe('responsividade e acessibilidade básica', () => {
  for (const viewport of [
    { name: 'mobile-360', width: 360, height: 800 },
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'mobile-414', width: 414, height: 896 },
    { name: 'mobile-430', width: 430, height: 932 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'tablet-landscape', width: 1024, height: 768 },
    { name: 'laptop', width: 1280, height: 800 },
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'desktop-wide', width: 1920, height: 1080 }
  ]) {
    test(`não existe scroll horizontal em ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      expect(width).toBeLessThanOrEqual(innerWidth);
    });
  }

  test('layout adapta-se em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
  });

  test('abre e fecha o menu mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();
    await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.getByRole('navigation', { name: 'Menu móvel' }).getByRole('link', { name: 'Exemplos', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('links sociais estão disponíveis', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('contentinfo').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
    await expect(page.locator('#sobre').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
    await expect(page.locator('#sobre').getByRole('link', { name: /GitHub/ })).toHaveCount(0);
  });

  test('gera screenshots full-page de auditoria visual', async ({ page }, testInfo) => {
    for (const viewport of [
      { name: 'desktop-1920x1080', width: 1920, height: 1080 },
      { name: 'desktop-1440x900', width: 1440, height: 900 },
      { name: 'laptop-1280x800', width: 1280, height: 800 },
      { name: 'tablet-landscape-1024x768', width: 1024, height: 768 },
      { name: 'tablet-768x1024', width: 768, height: 1024 },
      { name: 'mobile-430x932', width: 430, height: 932 },
      { name: 'mobile-414x896', width: 414, height: 896 },
      { name: 'mobile-390x844', width: 390, height: 844 },
      { name: 'mobile-375x812', width: 375, height: 812 },
      { name: 'mobile-360x800', width: 360, height: 800 }
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await waitForExperienceImages(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: testInfo.outputPath(`phase6-full-${viewport.name}.png`),
        fullPage: true
      });
    }
  });

  test('gera screenshots específicas de secções desktop e mobile', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase6-header-desktop.png') });
    await page.locator('#inicio').screenshot({ path: testInfo.outputPath('phase6-hero-desktop.png') });
    await page.locator('#problemas').screenshot({ path: testInfo.outputPath('phase6-problems-desktop.png') });
    await page.locator('#exemplos').screenshot({ path: testInfo.outputPath('phase6-examples-desktop.png') });
    await page.locator('#simulador').screenshot({ path: testInfo.outputPath('phase6-wizard-desktop.png') });
    await waitForExperienceImages(page);
    await page.locator('#experiencia').screenshot({ path: testInfo.outputPath('phase6-projects-desktop.png') });
    await page.locator('#rede').screenshot({ path: testInfo.outputPath('phase6-network-desktop.png') });
    await page.locator('#contacto').screenshot({ path: testInfo.outputPath('phase6-contact-desktop.png') });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('banner').screenshot({ path: testInfo.outputPath('phase6-header-mobile.png') });
    await page.locator('#inicio').screenshot({ path: testInfo.outputPath('phase6-hero-mobile.png') });
    await page.getByTestId('hero-brand-visual').screenshot({ path: testInfo.outputPath('phase6-hero-brand-mobile.png') });
    await page.locator('#problemas').screenshot({ path: testInfo.outputPath('phase6-problems-mobile.png') });
    await page.locator('#exemplos').screenshot({ path: testInfo.outputPath('phase6-examples-mobile.png') });
    await page.locator('#simulador').screenshot({ path: testInfo.outputPath('phase6-wizard-mobile.png') });
    await page.locator('#processo').screenshot({ path: testInfo.outputPath('phase6-process-mobile.png') });
    await waitForExperienceImages(page);
    await page.locator('#experiencia').screenshot({ path: testInfo.outputPath('phase6-projects-mobile.png') });
    await page.locator('#rede').screenshot({ path: testInfo.outputPath('phase6-network-mobile.png') });
    await page.locator('#sobre').screenshot({ path: testInfo.outputPath('phase6-founder-mobile.png') });
    await page.locator('#contacto').screenshot({ path: testInfo.outputPath('phase6-contact-mobile.png') });
    await page.getByRole('contentinfo').screenshot({ path: testInfo.outputPath('phase6-footer-mobile.png') });
  });

  test('layout mobile usa interações compactas e faixas responsivas', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const projectsCarousel = page.getByTestId('projects-carousel');

    await expect.poll(async () => projectsCarousel.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);

    await page.getByRole('button', { name: 'Não sei exatamente do que preciso' }).click();
    await expect(page.getByRole('heading', { name: 'Descobrir a solução certa' })).toBeVisible();

    const pedidosCard = page.locator('#exemplos article').filter({ has: page.getByRole('heading', { name: 'Gestão de pedidos' }) });
    const technicalButton = pedidosCard.getByRole('button');
    await expect(technicalButton).toHaveAttribute('aria-expanded', 'false');
    await technicalButton.click();
    await expect(technicalButton).toHaveAttribute('aria-expanded', 'true');

    await page.locator('#demonstracao').getByRole('button', { name: 'Equipa externa' }).click();
    await expect(page.locator('#demonstracao h3').filter({ hasText: 'Operação acompanhada fora da empresa' })).toBeVisible();

    await expect(page.getByLabel('Serviços principais').getByText('Automação inteligente')).toBeVisible();
    await expect(page.getByLabel('Serviços principais').getByText('Suporte e evolução')).toBeVisible();
  });

  test('campos, botões e âncoras mantêm medidas acessíveis', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    for (const controlName of ['Nome', 'Empresa', 'Email']) {
      const control = page.getByLabel(controlName, { exact: true });
      const metrics = await control.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { height: rect.height, fontSize: Number.parseFloat(getComputedStyle(element).fontSize) };
      });
      expect(metrics.height).toBeGreaterThanOrEqual(48);
      expect(metrics.fontSize).toBeGreaterThanOrEqual(16);
    }

    const submit = page.getByRole('button', { name: 'Enviar explicação' });
    const submitBox = await submit.boundingBox();
    expect(submitBox?.height).toBeGreaterThanOrEqual(44);

    for (const href of ['#problemas', '#exemplos', '#processo', '#experiencia', '#rede', '#sobre', '#contacto']) {
      await page.goto(`/${href}`);
      const top = await page.locator(href).boundingBox();
      expect(top?.y).toBeGreaterThanOrEqual(68);
    }
  });
});
