import { test, expect } from '@playwright/test';
import { validContactPayload } from '../shared/data/contact-data';

test('contact api does not return false success when email is not configured', async ({ request }) => {
  test.skip(Boolean(process.env.BASE_URL), 'Teste negativo de configuração só deve correr contra ambiente local controlado.');

  const response = await request.post('/api/contact', {
    data: validContactPayload,
    headers: {
      'x-forwarded-for': `203.0.113.${test.info().workerIndex + 10}`
    }
  });

  expect(response.status()).toBe(503);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'O formulário não está configurado para envio neste ambiente.'
  });
});
