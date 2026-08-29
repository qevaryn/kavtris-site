import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core';

export const membershipRole = pgEnum('membership_role', [
  'PROPRIETARIO',
  'ADMINISTRADOR',
  'COLABORADOR'
]);

export const membershipStatus = pgEnum('membership_status', [
  'ACTIVE',
  'DISABLED'
]);

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
};

export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    ...timestamps
  },
  (table) => [uniqueIndex('accounts_email_unique').on(table.email)]
);

export const companies = pgTable(
  'companies',
  {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    nif: text('nif'),
    ...timestamps
  },
  (table) => [index('companies_nif_idx').on(table.nif)]
);

export const memberships = pgTable(
  'memberships',
  {
    id: uuid('id').primaryKey(),
    accountId: uuid('account_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id')
      .notNull()
      .references(() => companies.id, { onDelete: 'cascade' }),
    role: membershipRole('role').notNull(),
    status: membershipStatus('status').notNull().default('ACTIVE'),
    ...timestamps
  },
  (table) => [
    uniqueIndex('memberships_account_company_unique').on(
      table.accountId,
      table.companyId
    ),
    index('memberships_company_idx').on(table.companyId)
  ]
);

export const sessions = pgTable(
  'auth_sessions',
  {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    ...timestamps
  },
  (table) => [
    uniqueIndex('auth_sessions_token_unique').on(table.token),
    index('auth_sessions_user_idx').on(table.userId)
  ]
);

export const authCredentialLinks = pgTable(
  'auth_credential_links',
  {
    id: uuid('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    issuer: text('issuer').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at', {
      withTimezone: true
    }),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
      withTimezone: true
    }),
    scope: text('scope'),
    password: text('password'),
    ...timestamps
  },
  (table) => [
    uniqueIndex('auth_credential_links_issuer_account_unique').on(
      table.issuer,
      table.accountId
    ),
    index('auth_credential_links_user_idx').on(table.userId)
  ]
);

export const verifications = pgTable(
  'auth_verifications',
  {
    id: uuid('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    ...timestamps
  },
  (table) => [index('auth_verifications_identifier_idx').on(table.identifier)]
);

export const authSchema = {
  accounts,
  sessions,
  authCredentialLinks,
  verifications
};
