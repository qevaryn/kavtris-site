import { expect, test } from '@playwright/test';

test('página sobre carrega com narrativa completa e H1 único', async ({ page }) => {
  await page.goto('/sobre');

  await expect(page.getByRole('heading', { level: 1, name: 'Construída com propósito, qualidade e vontade de servir.' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

  await expect(page.getByRole('heading', { name: 'Onde tudo começou' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Uma ideia construída também através da escuta' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Da qualidade de software nasceu uma visão maior' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Valores que orientam a forma de trabalhar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Gabriel Dias de Souza' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Não construímos sozinhos.' })).toBeVisible();

  await expect(page.getByText('A Qevaryn trabalha com clientes, profissionais e parceiros de diferentes histórias e crenças')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Conhecer os produtos' })).toHaveAttribute('href', '/produtos');
  await expect(page.getByRole('link', { name: 'Falar com a Qevaryn' })).toHaveAttribute('href', '/#contacto');
});

test('LinkedIn pessoal aparece apenas no bloco do fundador em /sobre', async ({ page }) => {
  await page.goto('/sobre');

  const founderCard = page.getByTestId('about-founder-card');
  const founderLinkedIn = founderCard.getByRole('link', { name: 'Ver perfil profissional no LinkedIn' });

  await expect(founderLinkedIn).toHaveCount(1);
  await expect(founderLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(founderLinkedIn).toHaveAttribute('target', '_blank');
  await expect(founderLinkedIn).toHaveAttribute('rel', /noopener/);

  await expect(page.getByRole('contentinfo').getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);
  await expect(page.getByRole('banner').getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);
  await expect(page.locator('main').getByRole('link', { name: /LinkedIn/i })).toHaveCount(1);
});

test('schema da página sobre contém Organization sem LinkedIn pessoal e Person com LinkedIn do fundador', async ({ page }) => {
  await page.goto('/sobre');

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const parsed = schemas.map((item) => JSON.parse(item));

  const organization = parsed.find((item) => item['@type'] === 'Organization');
  const person = parsed.find((item) => item['@type'] === 'Person');

  expect(organization).toBeTruthy();
  expect(Array.isArray(organization.sameAs) ? organization.sameAs.join(' ') : '').not.toContain('linkedin.com/in/gabrielsouza80');

  expect(person).toBeTruthy();
  expect(person.name).toBe('Gabriel Dias de Souza');
  expect(person.jobTitle).toBe('Fundador e QA Engineer');
  expect(person.sameAs).toContain('https://www.linkedin.com/in/gabrielsouza80/');
});

test('página sobre mantém layout utilizável em 320 px e imagens reais carregadas', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/sobre');

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  const founderImage = page.getByTestId('about-founder-card').getByAltText('Gabriel Dias de Souza, Fundador e QA Engineer da Qevaryn Systems');
  await founderImage.scrollIntoViewIfNeeded();
  await expect(founderImage).toBeVisible();
  await expect.poll(() => founderImage.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  const imageErrors: string[] = [];
  page.on('response', (response) => {
    const url = response.url();
    if (/\.(png|jpe?g|webp|svg)(\?|$)/i.test(url) && response.status() >= 400) {
      imageErrors.push(`${response.status()} ${url}`);
    }
  });

  await page.reload();
  await expect(imageErrors).toEqual([]);
});
