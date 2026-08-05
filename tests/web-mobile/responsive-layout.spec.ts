import { expect, test } from '@playwright/test';

test('mobile layout uses compact interactions and responsive bands', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Centralizar operações' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Organizar equipas externas' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Controlar stock e pedidos' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Melhorar atendimento ao cliente' })).toBeVisible();
  await expect(page.locator('[data-testid^="solution-option-panel-"]:not([hidden])')).toHaveCount(0);

  await page.getByRole('button', { name: 'Centralizar operações' }).click();
  await expect(page.getByRole('button', { name: 'Centralizar operações' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-testid="solution-option-panel-manual-work"]')).toBeVisible();

  await page.getByRole('button', { name: 'Controlar stock e pedidos' }).click();
  await expect(page.locator('[data-testid="solution-option-panel-stock"]')).toBeVisible();
  await expect(page.locator('[data-testid="solution-option-panel-manual-work"]')).toBeHidden();
  await expect(page.locator('#problemas').getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();

  await expect(page.getByTestId('services-ticker').getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(page.getByTestId('services-ticker').getByText('Suporte, correções e melhorias').first()).toBeVisible();
  await expect(page.getByTestId('featured-products-carousel')).toBeVisible();
  await expect(page.getByTestId('featured-products-desktop-grid')).toBeHidden();
  await expect(page.getByTestId('enterprise-capabilities-ticker')).toBeVisible();
  await expect(page.getByTestId('enterprise-capabilities-mobile-details')).toBeVisible();
  await expect(page.getByTestId('enterprise-capabilities-desktop-grid')).toBeHidden();
  await expect(page.getByLabel('Assinatura institucional')).toHaveCount(0);
  await expect(page.getByText('Ainda não sabe o que precisa?').first()).toBeVisible();
  await expect(page.locator('#problemas').getByRole('link', { name: 'Explique o seu problema' })).toHaveAttribute('href', '#contacto');
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

  for (const href of ['#problemas', '#produtos-preview', '#processo', '#empresas', '#sobre', '#contacto']) {
    await page.goto(`/${href}`);
    const top = await page.locator(href).boundingBox();
    expect(top?.y).toBeGreaterThanOrEqual(68);
  }
});
