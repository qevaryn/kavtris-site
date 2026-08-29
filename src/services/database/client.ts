import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { getIdentityEnv } from '@/config/identity-env';
import * as schema from '@/services/database/schema';

let database: ReturnType<typeof createDatabase> | undefined;

function createDatabase() {
  const { databaseUrl } = getIdentityEnv();
  const client = postgres(databaseUrl, {
    max: 10,
    prepare: false
  });

  return drizzle(client, { schema });
}

export function getDatabase() {
  database ??= createDatabase();
  return database;
}

export type Database = ReturnType<typeof drizzle>;
export type FoundationDatabase = ReturnType<typeof getDatabase>;
