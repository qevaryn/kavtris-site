import 'server-only';

import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import { v7 as uuidv7 } from 'uuid';
import { getIdentityEnv } from '@/config/identity-env';
import { getDatabase } from '@/services/database/client';
import { authSchema } from '@/services/database/schema';

const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;
const SESSION_UPDATE_AGE_SECONDS = 60 * 60 * 24;

function createAuth() {
  const env = getIdentityEnv();

  return betterAuth({
    appName: 'KAVTRIS',
    baseURL: env.authUrl,
    secret: env.authSecret,
    database: drizzleAdapter(getDatabase(), {
      provider: 'pg',
      schema: authSchema,
      usePlural: false,
      transaction: true
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      requireEmailVerification: false,
      revokeSessionsOnPasswordReset: true
    },
    user: {
      modelName: 'accounts'
    },
    session: {
      modelName: 'sessions',
      expiresIn: SESSION_EXPIRES_IN_SECONDS,
      updateAge: SESSION_UPDATE_AGE_SECONDS,
      cookieCache: {
        enabled: false
      }
    },
    account: {
      modelName: 'authCredentialLinks',
      accountLinking: {
        enabled: false,
        allowDifferentEmails: false,
        allowUnlinkingAll: false
      },
      encryptOAuthTokens: true
    },
    verification: {
      modelName: 'verifications',
      storeIdentifier: 'hashed'
    },
    trustedOrigins: [new URL(env.authUrl).origin],
    advanced: {
      useSecureCookies: env.isProduction,
      defaultCookieAttributes: {
        httpOnly: true,
        secure: env.isProduction,
        sameSite: 'lax',
        path: '/'
      },
      database: {
        generateId: () => uuidv7(),
        joins: false
      }
    }
  });
}

export type KavtrisAuth = ReturnType<typeof createAuth>;

let auth: KavtrisAuth | undefined;

export function getAuth(): KavtrisAuth {
  auth ??= createAuth();
  return auth;
}
