import { test, expect } from '@playwright/test';
import { validContactPayload } from '../shared/data/contact-data';

function testIp(suffix: number) {
  return `203.0.113.${test.info().workerIndex + suffix}`;
}

test('contact api does not return false success when email is not configured', async ({ request }) => {
  test.skip(Boolean(process.env.BASE_URL), 'Teste negativo de configuração só deve correr contra ambiente local controlado.');

  const response = await request.post('/api/contact', {
    data: validContactPayload,
    headers: {
      'x-forwarded-for': testIp(10)
    }
  });

  expect(response.status()).toBe(503);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'O formulário não está configurado para envio neste ambiente.'
  });
});

test('contact api rejects invalid payload before email delivery', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      email: 'email-invalido',
      message: 'curta'
    },
    headers: {
      'x-forwarded-for': testIp(30)
    }
  });

  expect(response.status()).toBe(400);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'Validação inválida.'
  });
});

test('contact api rejects honeypot submissions through current validation behavior', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      ...validContactPayload,
      honeypot: 'filled-by-bot'
    },
    headers: {
      'x-forwarded-for': testIp(50)
    }
  });

  expect(response.status()).toBe(400);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'Validação inválida.'
  });
});
