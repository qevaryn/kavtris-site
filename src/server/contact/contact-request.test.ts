import { describe, expect, it } from 'vitest';
import { CONTACT_REQUEST_MAX_BYTES, readContactJsonBody } from './contact-request';

describe('readContactJsonBody', () => {
  it('accepts JSON requests without relying on Content-Length', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: true })
    });

    expect(request.headers.get('content-length')).toBeNull();

    await expect(readContactJsonBody(request)).resolves.toEqual({
      ok: true,
      body: { ok: true }
    });
  });

  it('rejects oversized bodies by UTF-8 byte length', async () => {
    const body = JSON.stringify({ message: 'é'.repeat(CONTACT_REQUEST_MAX_BYTES) });
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body
    });

    expect(body.length).toBeLessThan(CONTACT_REQUEST_MAX_BYTES * 2);

    await expect(readContactJsonBody(request)).resolves.toEqual({
      ok: false,
      reason: 'payload-too-large'
    });
  });
});
