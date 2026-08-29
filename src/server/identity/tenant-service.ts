import 'server-only';

import { and, eq } from 'drizzle-orm';
import { v7 as uuidv7 } from 'uuid';
import type { CustomerPermission } from '@/domain/identity/authorization';
import {
  hasCustomerPermission,
  isCustomerRole
} from '@/domain/identity/authorization';
import type { CompanyBootstrapInput } from '@/domain/identity/contracts';
import { IdentityError } from '@/domain/identity/errors';
import type { Database } from '@/services/database/client';
import { getDatabase } from '@/services/database/client';
import {
  accounts,
  companies,
  memberships
} from '@/services/database/schema';

export type TenantContext = {
  accountId: string;
  company: {
    id: string;
    name: string;
    nif: string | null;
  };
  membership: {
    id: string;
    role: 'PROPRIETARIO' | 'ADMINISTRADOR' | 'COLABORADOR';
  };
};

export async function resolveTenantContext(
  accountId: string,
  companyId?: string,
  database: Database = getDatabase()
): Promise<TenantContext | null> {
  const filters = [
    eq(memberships.accountId, accountId),
    eq(memberships.status, 'ACTIVE')
  ];

  if (companyId) {
    filters.push(eq(memberships.companyId, companyId));
  }

  const result = await database
    .select({
      membershipId: memberships.id,
      membershipRole: memberships.role,
      companyId: companies.id,
      companyName: companies.name,
      companyNif: companies.nif
    })
    .from(memberships)
    .innerJoin(companies, eq(memberships.companyId, companies.id))
    .where(and(...filters))
    .limit(1);

  const row = result[0];

  if (!row || !isCustomerRole(row.membershipRole)) {
    return null;
  }

  return {
    accountId,
    company: {
      id: row.companyId,
      name: row.companyName,
      nif: row.companyNif
    },
    membership: {
      id: row.membershipId,
      role: row.membershipRole
    }
  };
}

export async function requireTenantPermission(
  accountId: string,
  companyId: string,
  permission: CustomerPermission,
  database: Database = getDatabase()
): Promise<TenantContext> {
  const context = await resolveTenantContext(accountId, companyId, database);

  if (!context || !hasCustomerPermission(context.membership.role, permission)) {
    throw new IdentityError(
      'AUTHORIZATION_DENIED',
      'Não tem autorização para realizar esta operação.'
    );
  }

  return context;
}

export async function bootstrapCompany(
  accountId: string,
  input: CompanyBootstrapInput,
  database: Database = getDatabase()
): Promise<TenantContext> {
  if (await resolveTenantContext(accountId, undefined, database)) {
    throw new IdentityError(
      'COMPANY_ALREADY_EXISTS',
      'A conta já possui uma empresa ativa.'
    );
  }

  const companyId = uuidv7();
  const membershipId = uuidv7();

  await database.transaction(async (transaction) => {
    const lockedAccount = await transaction
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.id, accountId))
      .for('update')
      .limit(1);

    if (lockedAccount.length === 0) {
      throw new IdentityError(
        'AUTHENTICATION_REQUIRED',
        'Inicie sessão para continuar.'
      );
    }

    const existingMembership = await transaction
      .select({ id: memberships.id })
      .from(memberships)
      .where(
        and(
          eq(memberships.accountId, accountId),
          eq(memberships.status, 'ACTIVE')
        )
      )
      .limit(1);

    if (existingMembership.length > 0) {
      throw new IdentityError(
        'COMPANY_ALREADY_EXISTS',
        'A conta já possui uma empresa ativa.'
      );
    }

    await transaction.insert(companies).values({
      id: companyId,
      name: input.name,
      nif: input.nif || null
    });

    await transaction.insert(memberships).values({
      id: membershipId,
      accountId,
      companyId,
      role: 'PROPRIETARIO',
      status: 'ACTIVE'
    });
  });

  return {
    accountId,
    company: {
      id: companyId,
      name: input.name,
      nif: input.nif || null
    },
    membership: {
      id: membershipId,
      role: 'PROPRIETARIO'
    }
  };
}
