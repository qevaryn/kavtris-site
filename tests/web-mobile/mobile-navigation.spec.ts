import { expect, test } from '@playwright/test';

test('mobile homepage exposes the mobile menu button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
});

test('mobile menu opens, locks body scroll and closes after route selection', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();
  await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

  const mobileNav = page.getByRole('navigation', { name: 'Menu móvel' });
  await expect(mobileNav.getByRole('link', { name: 'Como funciona', exact: true })).toHaveAttribute('href', '/#como-funciona');
  await expect(mobileNav.getByRole('link', { name: 'Produtos', exact: true })).toHaveAttribute('href', '/produtos');
  await expect(mobileNav.getByRole('link', { name: 'Engenharia', exact: true })).toHaveAttribute('href', '/empresas');
  await expect(mobileNav.getByRole('link', { name: 'Sobre', exact: true })).toHaveAttribute('href', '/sobre');
  await expect(mobileNav.getByRole('link', { name: 'Contacto', exact: true })).toHaveAttribute('href', '/#contacto');
  await expect(mobileNav.getByRole('link', { name: 'Exemplos', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Pedir demonstração' })).toBeVisible();

  await mobileNav.getByRole('link', { name: 'Como funciona', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('mobile menu fecha com Escape e devolve foco ao botão', async ({ page }) => {
  await page.goto('/');

  const trigger = page.getByRole('button', { name: 'Abrir menu' });
  await trigger.click();
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toHaveCount(0);
});
