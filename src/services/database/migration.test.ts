import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { v7 as uuidv7, validate as validateUuid, version as uuidVersion } from 'uuid';
import { describe, expect, it } from 'vitest';

const migrationPath = path.join(
  process.cwd(),
  'drizzle',
  '0000_happy_bullseye.sql'
);

async function createMigratedDatabase() {
  const database = new PGlite();
  const migration = await readFile(migrationPath, 'utf8');
  await database.exec(migration);
  return database;
}

describe('identity and tenancy migration', () => {
  it('applies to a clean PostgreSQL database with the canonical tables and enums', async () => {
    const database = await createMigratedDatabase();

    try {
      const tableResult = await database.query<{ table_name: string }>(
        `select table_name
         from information_schema.tables
         where table_schema = 'public'
         order by table_name`
      );

      expect(tableResult.rows.map((row) => row.table_name)).toEqual([
        'accounts',
        'auth_credential_links',
        'auth_sessions',
        'auth_verifications',
        'companies',
        'memberships'
      ]);
      expect(tableResult.rows.map((row) => row.table_name)).not.toContain('user');

      const enumResult = await database.query<{
        enum_name: string;
        enum_value: string;
      }>(
        `select type.typname as enum_name, enum.enumlabel as enum_value
         from pg_type type
         join pg_enum enum on type.oid = enum.enumtypid
         order by type.typname, enum.enumsortorder`
      );

      expect(enumResult.rows).toEqual([
        { enum_name: 'membership_role', enum_value: 'PROPRIETARIO' },
        { enum_name: 'membership_role', enum_value: 'ADMINISTRADOR' },
        { enum_name: 'membership_role', enum_value: 'COLABORADOR' },
        { enum_name: 'membership_status', enum_value: 'ACTIVE' },
        { enum_name: 'membership_status', enum_value: 'DISABLED' }
      ]);
    } finally {
      await database.close();
    }
  });

  it('enforces identity, credential, session, membership, and foreign-key constraints', async () => {
    const database = await createMigratedDatabase();
    const accountId = uuidv7();
    const companyId = uuidv7();

    try {
      await database.query(
        `insert into accounts (id, name, email)
         values ($1, $2, $3)`,
        [accountId, 'Conta Teste', 'conta@example.test']
      );
      await database.query(
        `insert into companies (id, name, nif)
         values ($1, $2, $3)`,
        [companyId, 'Empresa Teste', '509999990']
      );
      await database.query(
        `insert into memberships (id, account_id, company_id, role)
         values ($1, $2, $3, 'PROPRIETARIO')`,
        [uuidv7(), accountId, companyId]
      );

      await expect(
        database.query(
          `insert into accounts (id, name, email)
           values ($1, $2, $3)`,
          [uuidv7(), 'Outra Conta', 'conta@example.test']
        )
      ).rejects.toMatchObject({ code: '23505' });

      await expect(
        database.query(
          `insert into memberships (id, account_id, company_id, role)
           values ($1, $2, $3, 'COLABORADOR')`,
          [uuidv7(), accountId, companyId]
        )
      ).rejects.toMatchObject({ code: '23505' });

      await database.query(
        `insert into auth_credential_links
           (id, account_id, provider_id, issuer, user_id)
         values ($1, $2, $3, $4, $5)`,
        [uuidv7(), 'credential-1', 'credential', 'credential', accountId]
      );

      await expect(
        database.query(
          `insert into auth_credential_links
             (id, account_id, provider_id, issuer, user_id)
           values ($1, $2, $3, $4, $5)`,
          [uuidv7(), 'credential-1', 'other-provider', 'credential', accountId]
        )
      ).rejects.toMatchObject({ code: '23505' });

      await database.query(
        `insert into auth_sessions (id, user_id, token, expires_at)
         values ($1, $2, $3, now() + interval '1 day')`,
        [uuidv7(), accountId, 'opaque-session-token']
      );

      await expect(
        database.query(
          `insert into auth_sessions (id, user_id, token, expires_at)
           values ($1, $2, $3, now() + interval '1 day')`,
          [uuidv7(), accountId, 'opaque-session-token']
        )
      ).rejects.toMatchObject({ code: '23505' });

      await expect(
        database.query(
          `insert into memberships (id, account_id, company_id, role)
           values ($1, $2, $3, 'COLABORADOR')`,
          [uuidv7(), uuidv7(), companyId]
        )
      ).rejects.toMatchObject({ code: '23503' });
    } finally {
      await database.close();
    }
  });

  it('stores UUIDv7 identifiers in PostgreSQL uuid columns', async () => {
    const database = await createMigratedDatabase();
    const accountId = uuidv7();

    try {
      await database.query(
        `insert into accounts (id, name, email)
         values ($1, $2, $3)`,
        [accountId, 'Conta UUIDv7', 'uuidv7@example.test']
      );

      const result = await database.query<{ id: string }>(
        'select id::text as id from accounts where id = $1',
        [accountId]
      );

      expect(validateUuid(accountId)).toBe(true);
      expect(uuidVersion(accountId)).toBe(7);
      expect(result.rows).toEqual([{ id: accountId }]);
    } finally {
      await database.close();
    }
  });
});
