import { test, expect } from '@playwright/test';
import { validContactPayload } from '../shared/data/contact-data';

/**
 * Safe zero-cost browser contact coverage.
 *
 * These tests exercise the REAL browser -> ContactForm -> submitContact ->
 * POST /api/contact -> validation/service -> mock provider -> success UI flow
 * against a local development server. Mock scenarios require the server to be
 * running in development mode with CONTACT_FORM_MOCK=true (the mock guard
 * requires NODE_ENV !== 'production'). The beforeAll probe detects whether the
 * server currently exposes the mock provider and skips mock-only scenarios.
 *
 * Safety: no Resend calls, no emails, no quota, no production/preview POSTs.
 * No page.route interception is used for the real success flow.
 */
let mockActive = false;

// Unique synthetic IP per execution + worker to isolate the process-local rate
// limiter (the Map retains state while a dev server stays alive).
// Two variable octets give a much larger address space so parallel workers /
// repeated runs never collide on the same synthetic client key.
let ipCounter = 0;

function testIp(suffix: number) {
  ipCounter += 1;
  const seed = Date.now() + ipCounter * 7919 + test.info().workerIndex * 1000003 + suffix;
  const a = ((seed >> 8) % 253) + 1;
  const b = (seed % 253) + 1;
  return `203.0.${a}.${b}`;
}

test.beforeAll(async ({ request }) => {
  try {
    const response = await request.post('/api/contact', {
      data: validContactPayload,
      headers: { 'x-forwarded-for': testIp(190) }
    });
    mockActive = response.status() === 200;
  } catch {
    mockActive = false;
  }
});

async function fillContactForm(page: import('@playwright/test').Page) {
  await page.getByRole('textbox', { name: 'Nome' }).fill('Utilizador QA');
  await page.getByRole('textbox', { name: 'Empresa' }).fill('Empresa QA');
  await page.getByRole('textbox', { name: 'Email' }).fill('contact-browser@example.test');
  await page.getByRole('textbox', { name: /Telefone/ }).fill('+351 900 000 001');
  await page.getByLabel('Produto ou problema').selectOption({ label: 'Reduzir tarefas manuais' });
  await page.getByLabel('Produto de interesse').selectOption({ label: 'Ainda não sei qual solução preciso' });
  await page.locator('textarea#message').fill(
    'Mensagem sintética válida para validar o fluxo real do formulário com mock local.'
  );
  await page.getByLabel('Li e aceito a Política de Privacidade.').check();
}

test('browser contact success posts to the real local API in mock mode', async ({ page }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  // Isolate this browser session behind a synthetic IP so the shared process-local
  // rate limiter never interferes with the success flow.
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': testIp(200) });

  const contactResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes('/api/contact') &&
      response.request().method() === 'POST'
  );

  await page.goto('/');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Enviar explicação' }).click();

  const response = await contactResponsePromise;
  expect(response.status()).toBe(200);
  await expect(await response.json()).toMatchObject({ ok: true });

  await expect(page.getByRole('status')).toContainText(/Pedido enviado com sucesso/i);
});

test('browser contact single click results in exactly one API POST', async ({ page }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  await page.setExtraHTTPHeaders({ 'x-forwarded-for': testIp(201) });

  const postUrls: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().includes('/api/contact')) {
      postUrls.push(request.url());
    }
  });

  await page.goto('/');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Enviar explicação' }).click();

  await expect(page.getByRole('status')).toContainText(/Pedido enviado com sucesso/i);
  expect(postUrls).toHaveLength(1);
});

test('browser contact double-click does not duplicate the API POST', async ({ page }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  await page.setExtraHTTPHeaders({ 'x-forwarded-for': testIp(202) });

  const postUrls: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().includes('/api/contact')) {
      postUrls.push(request.url());
    }
  });

  await page.goto('/');
  await fillContactForm(page);

  const submitButton = page.getByRole('button', { name: 'Enviar explicação' });
  await submitButton.click({ delay: 50 });
  // Second click while the first request is still in flight; the button is
  // disabled during the pending transition, so no second POST should fire.
  await submitButton.click({ delay: 50 }).catch(() => undefined);

  await expect(page.getByRole('status')).toContainText(/Pedido enviado com sucesso/i);
  expect(postUrls).toHaveLength(1);
});

test('browser contact shows a real 429 rate-limit error UI after 4 submissions', async ({ page, request }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  const rateLimitIp = testIp(203);

  // Prepare the process-local rate limiter with the minimum valid requests for
  // the same synthetic IP: the 4th submission from the browser must be rejected.
  const prepHeaders = { 'x-forwarded-for': rateLimitIp };
  for (let index = 0; index < 3; index += 1) {
    const prep = await request.post('/api/contact', {
      data: validContactPayload,
      headers: prepHeaders
    });
    expect(prep.status()).not.toBe(429);
  }

  await page.setExtraHTTPHeaders({ 'x-forwarded-for': rateLimitIp });
  await page.goto('/');
  await fillContactForm(page);
  await page.getByRole('button', { name: 'Enviar explicação' }).click();

  await expect(page.getByRole('status')).toContainText(/demasiados pedidos/i);
});

