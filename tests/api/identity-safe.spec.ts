import { test, expect } from '@playwright/test';

/**
 * Safe identity API coverage.
 *
 * These tests exercise the company bootstrap HTTP boundary (/api/account/company)
 * against a local development server. They cover request-contract and
 * authentication-gate behaviour only:
 *
 * - unsupported / missing content type
 * - malformed JSON
 * - unauthenticated request returns 401 (no session cookie)
 *
 * They never create an account, company, or membership, and never POST to
 * production. The authenticated happy path is covered by unit/integration
 * tests against an in-memory PGlite database.
 */

test('company bootstrap rejects non-JSON content type', async ({ request }) => {
  const response = await request.post('/api/account/company', {
    data: 'name=Empresa',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  });

  expect(response.status()).toBe(415);
  await expect(await response.json()).toMatchObject({ ok: false });
});

test('company bootstrap rejects malformed JSON', async ({ request }) => {
  const response = await request.post('/api/account/company', {
    data: Buffer.from('{invalid json'),
    headers: { 'content-type': 'application/json' }
  });

  expect(response.status()).toBe(400);
  await expect(await response.json()).toMatchObject({ ok: false });
});

test('company bootstrap requires an authenticated session', async ({ request }) => {
  const response = await request.post('/api/account/company', {
    data: { name: 'Empresa' },
    headers: { 'content-type': 'application/json' }
  });

  expect(response.status()).toBe(401);
  await expect(await response.json()).toMatchObject({ ok: false });
});

test('auth catch-all route is reachable', async ({ request }) => {
  const response = await request.get('/api/auth/get-session');
  expect([200, 401]).toContain(response.status());
});
