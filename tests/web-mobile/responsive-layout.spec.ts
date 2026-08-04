import { expect, test } from '@playwright/test';

test('mobile layout uses compact interactions and responsive bands', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Ainda não sei' }).click();
  await expect(page.getByRole('heading', { name: 'Começar pela conversa certa' })).toBeVisible();

  await page.getByRole('button', { name: 'Controlar stock' }).click();
  await expect(page.locator('#problemas').getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();

  await expect(page.getByLabel('Serviços principais').getByText('Reduzir tarefas manuais')).toBeVisible();
  await expect(page.getByLabel('Serviços principais').getByText('Suporte, correções e melhorias')).toBeVisible();
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
