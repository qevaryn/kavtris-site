import { afterEach, describe, expect, it, vi } from 'vitest';
import { IdentityError } from '@/domain/identity/errors';
import { handleCompanyBootstrap } from '@/server/identity/company-controller';

const getSessionMock = vi.fn();
vi.mock('@/server/auth/auth', () => ({
  getAuth: () => ({
    api: {
      getSession: (...args: unknown[]) => getSessionMock(...args)
    }
  })
}));

const bootstrapMock = vi.fn();
vi.mock('@/server/identity/tenant-service', () => ({
  bootstrapCompany: (...args: unknown[]) => bootstrapMock(...args)
}));

function jsonRequest(body: unknown, extraHeaders: Record<string, string> = {}) {
  return new Request('http://localhost/api/account/company', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
    body: JSON.stringify(body)
  });
}

describe('company bootstrap controller', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 without an authenticated session', async () => {
    getSessionMock.mockResolvedValue(null);

    const result = await handleCompanyBootstrap(jsonRequest({ name: 'Empresa' }));
    expect(result.status).toBe(401);
    expect(result.body.ok).toBe(false);
  });

  it('rejects a malformed JSON body with 400', async () => {
    getSessionMock.mockResolvedValue({ user: { id: 'account-id' } });

    const request = new Request('http://localhost/api/account/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{not-json'
    });

    const result = await handleCompanyBootstrap(request);
    expect(result.status).toBe(400);
    expect(result.body.ok).toBe(false);
  });

  it('rejects unknown writable fields with 400', async () => {
    getSessionMock.mockResolvedValue({ user: { id: 'account-id' } });

    const result = await handleCompanyBootstrap(
      jsonRequest({ name: 'Empresa', role: 'OWNER' })
    );
    expect(result.status).toBe(400);
    expect(result.body.ok).toBe(false);
  });

  it('maps COMPANY_ALREADY_EXISTS to 409', async () => {
    bootstrapMock.mockRejectedValue(
      new IdentityError('COMPANY_ALREADY_EXISTS', 'Já existe.')
    );

    const result = await handleCompanyBootstrap(jsonRequest({ name: 'Empresa' }));
    expect(result.status).toBe(409);
  });

  it('returns 201 and the tenant context on success', async () => {
    bootstrapMock.mockResolvedValue({
      accountId: 'account-id',
      company: { id: 'company-id', name: 'Empresa', nif: null },
      membership: { id: 'membership-id', role: 'PROPRIETARIO' }
    });

    const result = await handleCompanyBootstrap(jsonRequest({ name: 'Empresa' }));
    expect(result.status).toBe(201);
    expect(result.body.ok).toBe(true);
  });
});
