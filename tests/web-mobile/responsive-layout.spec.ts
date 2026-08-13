import { expect, test } from '@playwright/test';

test('mobile layout uses compact interactions and responsive bands', async ({ page }) => {
  await page.goto('/');

  // WEB.1A — the Solution Finder is no longer rendered on the homepage.
  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toHaveCount(0);
  await expect(page.locator('#problemas')).toHaveCount(0);

  await expect(page.getByTestId('services-ticker').getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(page.getByTestId('services-ticker').getByText('Suporte, correções e melhorias').first()).toBeVisible();
  await expect(page.getByTestId('process-carousel')).toBeVisible();
  await expect(page.getByTestId('featured-products-carousel')).toBeVisible();
  await expect(page.getByTestId('enterprise-capabilities-carousel')).toBeVisible();
  await expect(page.getByLabel('Assinatura institucional')).toHaveCount(0);
  await expect(page.locator('#contacto').getByRole('heading', { name: 'Não precisa chegar com uma solução pronta.' })).toBeVisible();
});

test('mobile fields, buttons and anchored sections remain accessible', async ({ page }) => {
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

  for (const href of ['#como-trabalhamos', '#produtos-preview', '#empresas', '#rede', '#contacto']) {
    await page.goto(`/${href}`);
    const top = await page.locator(href).boundingBox();
    expect(top?.y).toBeGreaterThanOrEqual(68);
  }
});
