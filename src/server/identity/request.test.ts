import { describe, expect, it } from 'vitest';
import {
  IDENTITY_REQUEST_MAX_BYTES,
  readIdentityJsonBody
} from '@/server/identity/request';

describe('identity JSON request reader', () => {
  it('accepts application/json with parameters', async () => {
    const result = await readIdentityJsonBody(
      new Request('http://localhost/api/account/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ name: 'Empresa KAVTRIS' })
      })
    );

    expect(result).toEqual({ ok: true, body: { name: 'Empresa KAVTRIS' } });
  });

  it('rejects unsupported media types', async () => {
    const result = await readIdentityJsonBody(
      new Request('http://localhost/api/account/company', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: '{}'
      })
    );

    expect(result).toEqual({ ok: false, reason: 'unsupported-media-type' });
  });

  it('rejects malformed JSON', async () => {
    const result = await readIdentityJsonBody(
      new Request('http://localhost/api/account/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{not-json}'
      })
    );

    expect(result).toEqual({ ok: false, reason: 'malformed-json' });
  });

  it('rejects payloads larger than the transport limit', async () => {
    const result = await readIdentityJsonBody(
      new Request('http://localhost/api/account/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'x'.repeat(IDENTITY_REQUEST_MAX_BYTES) })
      })
    );

    expect(result).toEqual({ ok: false, reason: 'payload-too-large' });
  });

  it('rejects an oversized declared content length before reading the body', async () => {
    const result = await readIdentityJsonBody(
      new Request('http://localhost/api/account/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': String(IDENTITY_REQUEST_MAX_BYTES + 1)
        },
        body: '{}'
      })
    );

    expect(result).toEqual({ ok: false, reason: 'payload-too-large' });
  });
});
