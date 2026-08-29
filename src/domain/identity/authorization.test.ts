import { describe, expect, it } from 'vitest';
import {
  hasCustomerPermission,
  isCustomerRole
} from '@/domain/identity/authorization';

describe('customer authorization', () => {
  it('recognizes only the frozen customer roles', () => {
    expect(isCustomerRole('PROPRIETARIO')).toBe(true);
    expect(isCustomerRole('ADMINISTRADOR')).toBe(true);
    expect(isCustomerRole('COLABORADOR')).toBe(true);
    expect(isCustomerRole('STAFF_ADMIN')).toBe(false);
    expect(isCustomerRole(null)).toBe(false);
  });

  it('keeps update permission away from collaborators', () => {
    expect(hasCustomerPermission('PROPRIETARIO', 'company:update')).toBe(true);
    expect(hasCustomerPermission('ADMINISTRADOR', 'company:update')).toBe(true);
    expect(hasCustomerPermission('COLABORADOR', 'company:update')).toBe(false);
  });

  it('allows every customer role to read its company and membership', () => {
    for (const role of ['PROPRIETARIO', 'ADMINISTRADOR', 'COLABORADOR'] as const) {
      expect(hasCustomerPermission(role, 'company:read')).toBe(true);
      expect(hasCustomerPermission(role, 'membership:read')).toBe(true);
    }
  });
});
