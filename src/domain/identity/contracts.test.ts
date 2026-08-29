import { describe, expect, it } from 'vitest';
import { companyBootstrapSchema } from '@/domain/identity/contracts';

describe('company bootstrap contract', () => {
  it('normalizes valid company input', () => {
    expect(
      companyBootstrapSchema.parse({ name: '  Empresa KAVTRIS  ', nif: ' 509999990 ' })
    ).toEqual({ name: 'Empresa KAVTRIS', nif: '509999990' });
  });

  it('rejects unknown writable fields', () => {
    const result = companyBootstrapSchema.safeParse({
      name: 'Empresa KAVTRIS',
      role: 'PROPRIETARIO'
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid company names and NIF values', () => {
    expect(companyBootstrapSchema.safeParse({ name: 'X' }).success).toBe(false);
    expect(
      companyBootstrapSchema.safeParse({ name: 'Empresa KAVTRIS', nif: '123' })
        .success
    ).toBe(false);
  });
});
