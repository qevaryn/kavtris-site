import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { eq } from 'drizzle-orm';
import { v7 as uuidv7 } from 'uuid';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { IdentityError } from '@/domain/identity/errors';
import * as schema from '@/services/database/schema';
import {
  bootstrapCompany,
  resolveTenantContext,
  requireTenantPermission
} from '@/server/identity/tenant-service';
import type { Database } from '@/services/database/client';

const migrationPath = path.join(process.cwd(), 'drizzle', '0000_happy_bullseye.sql');

let database: Database;

beforeEach(async () => {
  const pglite = new PGlite();
  await pglite.exec(await readFile(migrationPath, 'utf8'));
  database = drizzle(pglite, { schema }) as unknown as Database;
});

afterEach(() => {
  database = undefined as unknown as Database;
});

async function seedAccount(id: string, email: string) {
  await database.insert(schema.accounts).values({ id, name: 'Conta', email });
}

describe('tenant service integration', () => {
  it('creates company and PROPRIETARIO membership atomically on first bootstrap', async () => {
    const accountId = uuidv7();
    await seedAccount(accountId, 'proprietario@example.test');

    const context = await bootstrapCompany(
      accountId,
      {
        name: 'Empresa KAVTRIS',
        nif: '509999990'
      },
      database
    );

    expect(context.membership.role).toBe('PROPRIETARIO');
    expect(context.company.name).toBe('Empresa KAVTRIS');

    const resolved = await resolveTenantContext(accountId, undefined, database);
    expect(resolved?.company.id).toBe(context.company.id);
    expect(resolved?.company.nif).toBe('509999990');
  });

  it('denies a second bootstrap for an account with an active membership', async () => {
    const accountId = uuidv7();
    await seedAccount(accountId, 'duplo@example.test');

    await bootstrapCompany(accountId, { name: 'Primeira Empresa' }, database);

    await expect(
      bootstrapCompany(accountId, { name: 'Segunda Empresa' }, database)
    ).rejects.toBeInstanceOf(IdentityError);

    const companies = await database
      .select({ name: schema.companies.name })
      .from(schema.companies);
    expect(companies).toHaveLength(1);
  });

  it('rolls back company creation when membership insertion fails', async () => {
    const accountId = uuidv7();
    await seedAccount(accountId, 'rollback@example.test');

    const originalTransaction = database.transaction.bind(database);
    let membershipCall = false;
    type Tx = Parameters<Parameters<Database['transaction']>[0]>[0];
    database.transaction = (async (callback: (tx: Tx) => Promise<unknown>) => {
      return originalTransaction(async (tx: Tx) => {
        const realInsert = tx.insert.bind(tx);
        tx.insert = ((table: Parameters<typeof realInsert>[0]) => {
          if (table === schema.memberships) {
            membershipCall = true;
            throw new Error('Simulated membership failure');
          }
          return realInsert(table);
        }) as typeof realInsert;
        return callback(tx);
      });
    }) as typeof database.transaction;

    await expect(
      bootstrapCompany(accountId, { name: 'Empresa Falha', nif: '509999991' }, database)
    ).rejects.toThrow();

    database.transaction = originalTransaction;

    const companies = await database
      .select({ name: schema.companies.name })
      .from(schema.companies);
    expect(companies).toHaveLength(0);
    expect(membershipCall).toBe(true);
  });

  it('denies cross-tenant resolution without exposing resource existence', async () => {
    const ownerId = uuidv7();
    const strangerId = uuidv7();
    await seedAccount(ownerId, 'dono@example.test');
    await seedAccount(strangerId, 'estranho@example.test');

    const context = await bootstrapCompany(ownerId, { name: 'Empresa Privada' }, database);

    const denied = await resolveTenantContext(strangerId, context.company.id, database);
    expect(denied).toBeNull();
  });

  it('denies access for a disabled membership', async () => {
    const accountId = uuidv7();
    await seedAccount(accountId, 'desativado@example.test');

    const context = await bootstrapCompany(accountId, { name: 'Empresa Desativada' }, database);

    await database
      .update(schema.memberships)
      .set({ status: 'DISABLED' })
      .where(eq(schema.memberships.id, context.membership.id));

    expect(await resolveTenantContext(accountId, undefined, database)).toBeNull();
  });

  it('allows COLABORADOR to read but not update the company', async () => {
    const accountId = uuidv7();
    await seedAccount(accountId, 'colaborador@example.test');

    const context = await bootstrapCompany(
      accountId,
      { name: 'Empresa Colaborador' },
      database
    );
    await database
      .update(schema.memberships)
      .set({ role: 'COLABORADOR' })
      .where(eq(schema.memberships.id, context.membership.id));

    await expect(
      requireTenantPermission(accountId, context.company.id, 'company:update', database)
    ).rejects.toBeInstanceOf(IdentityError);

    const read = await requireTenantPermission(
      accountId,
      context.company.id,
      'company:read',
      database
    );
    expect(read.company.id).toBe(context.company.id);
  });
});
