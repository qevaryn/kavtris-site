import { test, expect } from '@playwright/test';
import { validContactPayload } from '../shared/data/contact-data';

/**
 * Safe zero-cost contact API coverage.
 *
 * These tests exercise the real HTTP endpoint (/api/contact) against a local
 * development server. Mock success scenarios require the server to be running
 * in development mode with CONTACT_FORM_MOCK=true (the mock guard requires
 * NODE_ENV !== 'production'). The beforeAll probe detects whether the server
 * currently exposes the mock provider and skips mock-only scenarios otherwise.
 *
 * Safety: no Resend calls, no emails, no quota, no production/preview POSTs.
 * Every request uses a synthetic per-test IP to keep the rate limiter isolated.
 */
let mockActive = false;

// Unique synthetic IP per execution + worker to keep the process-local rate
// limiter isolated (the Map retains state while a dev server stays alive).
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
      headers: { 'x-forwarded-for': testIp(90) }
    });
    mockActive = response.status() === 200;
  } catch {
    mockActive = false;
  }
});

test('real localhost POST succeeds in contact mock mode', async ({ request }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  const response = await request.post('/api/contact', {
    data: validContactPayload,
    headers: { 'x-forwarded-for': testIp(91) }
  });

  expect(response.status()).toBe(200);
  await expect(response).toBeOK();
  await expect(await response.json()).toMatchObject({ ok: true });
});

test('unsupported contact method does not execute the contact POST handler', async ({ request }) => {
  const response = await request.fetch('/api/contact', {
    method: 'PUT',
    data: validContactPayload,
    headers: { 'x-forwarded-for': testIp(88) }
  });

  expect(response.status()).toBe(405);
});

test('real localhost POST is rejected for malformed JSON without touching the provider', async ({ request }) => {
  // Buffer keeps the payload raw; a plain string would be JSON-serialized by
  // the client and arrive as a valid JSON string rejected by validation (400).
  const response = await request.post('/api/contact', {
    data: Buffer.from('{invalid json'),
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': testIp(92)
    }
  });

  expect(response.status()).toBe(400);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'Pedido inválido.'
  });
});

test('real localhost POST rejects missing content type', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: Buffer.from(JSON.stringify(validContactPayload)),
    headers: { 'x-forwarded-for': testIp(99) }
  });

  expect(response.status()).toBe(415);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'Tipo de conteúdo não suportado.'
  });
});

test('real localhost POST rejects text/plain content type', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: Buffer.from(JSON.stringify(validContactPayload)),
    headers: {
      'content-type': 'text/plain',
      'x-forwarded-for': testIp(100)
    }
  });

  expect(response.status()).toBe(415);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'Tipo de conteúdo não suportado.'
  });
});

test('real localhost POST accepts application/json with charset', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: Buffer.from(JSON.stringify(validContactPayload)),
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'x-forwarded-for': testIp(101)
    }
  });

  expect(response.status()).not.toBe(415);
});

test('real localhost POST rejects oversized JSON before provider delivery', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: Buffer.from(JSON.stringify({
      ...validContactPayload,
      message: 'A'.repeat(17_000)
    })),
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': testIp(102)
    }
  });

  expect(response.status()).toBe(413);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'Pedido demasiado grande.'
  });
});

test('real localhost POST enforces the body limit using UTF-8 bytes', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: Buffer.from(JSON.stringify({
      ...validContactPayload,
      message: 'é'.repeat(8_300)
    }), 'utf8'),
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': testIp(103)
    }
  });

  expect(response.status()).toBe(413);
  await expect(response).not.toBeOK();
});

for (const [label, data] of [
  ['null', null],
  ['array', []],
  ['string', 'contact'],
  ['number', 123],
  ['boolean', false]
] as const) {
  test(`real localhost POST rejects ${label} JSON as validation error`, async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: Buffer.from(JSON.stringify(data)),
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': testIp(110)
      }
    });

    expect(response.status()).toBe(400);
    await expect(response).not.toBeOK();
    await expect(await response.json()).toMatchObject({
      ok: false,
      message: 'Validação inválida.'
    });
  });
}

for (const [label, privacyConsent] of [
  ['missing', undefined],
  ['false', false],
  ['wrong type', 'true']
] as const) {
  test(`real localhost POST rejects privacyConsent ${label}`, async ({ request }) => {
    const payload: Record<string, unknown> = { ...validContactPayload };

    if (privacyConsent === undefined) {
      delete payload.privacyConsent;
    } else {
      payload.privacyConsent = privacyConsent;
    }

    const response = await request.post('/api/contact', {
      data: payload,
      headers: { 'x-forwarded-for': testIp(120) }
    });

    expect(response.status()).toBe(400);
    await expect(response).not.toBeOK();
    await expect(await response.json()).toMatchObject({
      ok: false,
      message: 'Validação inválida.'
    });
  });
}

test('rate limiter rejects the 4th request for the same client', async ({ request }) => {
  const headers = { 'x-forwarded-for': testIp(93) };

  for (let index = 0; index < 3; index += 1) {
    const response = await request.post('/api/contact', {
      data: validContactPayload,
      headers
    });
    // Payload is valid, so the response must NOT be a rate-limit rejection.
    // (In production-without-config this is 503; in mock mode it is 200.)
    expect(response.status()).not.toBe(429);
  }

  const fourth = await request.post('/api/contact', {
    data: validContactPayload,
    headers
  });

  expect(fourth.status()).toBe(429);
  expect(fourth.headers()['retry-after']).toMatch(/^[1-9]\d*$/);
  await expect(await fourth.json()).toMatchObject({
    ok: false,
    message: 'Foram enviados demasiados pedidos. Tente novamente mais tarde.'
  });
});

test('whitespace around name and message is trimmed before validation', async ({ request }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      name: '  Utilizador QA  ',
      message: '  Mensagem com espaços externos suficiente para ser válida após trim.  '
    },
    headers: { 'x-forwarded-for': testIp(94) }
  });

  expect(response.status()).toBe(200);
  await expect(await response.json()).toMatchObject({ ok: true });
});

test('name at the maximum allowed length is accepted', async ({ request }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      name: 'A'.repeat(80)
    },
    headers: { 'x-forwarded-for': testIp(95) }
  });

  expect(response.status()).toBe(200);
  await expect(await response.json()).toMatchObject({ ok: true });
});

test('name above the maximum allowed length is rejected', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      name: 'A'.repeat(81)
    },
    headers: { 'x-forwarded-for': testIp(96) }
  });

  expect(response.status()).toBe(400);
  await expect(response).not.toBeOK();
});

test('message at the minimum allowed length is accepted', async ({ request }) => {
  test.skip(!mockActive, 'Requires dev server with CONTACT_FORM_MOCK=true (mock inactive).');

  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      message: 'M'.repeat(20)
    },
    headers: { 'x-forwarded-for': testIp(97) }
  });

  expect(response.status()).toBe(200);
  await expect(await response.json()).toMatchObject({ ok: true });
});

test('message above the maximum allowed length is rejected', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      message: 'M'.repeat(1201)
    },
    headers: { 'x-forwarded-for': testIp(98) }
  });

  expect(response.status()).toBe(400);
  await expect(response).not.toBeOK();
});
