import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/pglite';
import { v7 as uuidv7, version as uuidVersion } from 'uuid';
import { describe, expect, it } from 'vitest';
import * as schema from '@/services/database/schema';

const migrationPath = path.join(process.cwd(), 'drizzle', '0000_happy_bullseye.sql');
const baseURL = 'http://localhost:3000';
const password = 'Foundation-password-123';

function jsonRequest(pathname: string, body: unknown, cookie?: string) {
  return new Request(`${baseURL}/api/auth${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {})
    },
    body: JSON.stringify(body)
  });
}

function sessionCookie(response: Response) {
  const setCookie = response.headers.get('set-cookie');
  expect(setCookie).toBeTruthy();
  return (setCookie as string).split(';', 1)[0];
}

describe('Better Auth identity integration', () => {
  it('persists the canonical account, credential link, and authoritative database session', async () => {
    const client = new PGlite();

    try {
      await client.exec(await readFile(migrationPath, 'utf8'));
      const database = drizzle(client, { schema });
      const auth = betterAuth({
        baseURL,
        secret: 'test-only-foundation-secret-32-characters-minimum',
        database: drizzleAdapter(database, {
          provider: 'pg',
          schema: schema.authSchema,
          usePlural: false,
          transaction: true
        }),
        emailAndPassword: {
          enabled: true,
          minPasswordLength: 12,
          requireEmailVerification: false,
          autoSignIn: false
        },
        user: { modelName: 'accounts' },
        session: {
          modelName: 'sessions',
          cookieCache: { enabled: false }
        },
        account: { modelName: 'authCredentialLinks' },
        verification: { modelName: 'verifications' },
        advanced: {
          defaultCookieAttributes: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
          },
          database: {
            generateId: () => uuidv7(),
            joins: false
          }
        }
      });

      const signUp = await auth.handler(
        jsonRequest('/sign-up/email', {
          email: 'foundation-auth@example.test',
          name: 'Foundation Auth',
          password
        })
      );
      expect(signUp.status).toBe(200);
      expect((await signUp.json()).token).toBeNull();
      expect(signUp.headers.get('set-cookie')).toBeNull();

      const duplicateSignUp = await auth.handler(
        jsonRequest('/sign-up/email', {
          email: 'foundation-auth@example.test',
          name: 'Foundation Auth',
          password
        })
      );
      expect(duplicateSignUp.status).toBe(signUp.status);
      expect(await duplicateSignUp.json()).toMatchObject({ token: null });
      expect(duplicateSignUp.headers.get('set-cookie')).toBeNull();

      const accountRows = await database.select().from(schema.accounts);
      expect(accountRows).toHaveLength(1);
      expect(accountRows[0]).toMatchObject({
        email: 'foundation-auth@example.test',
        name: 'Foundation Auth'
      });
      expect(uuidVersion(accountRows[0].id)).toBe(7);

      const credentialRows = await database
        .select()
        .from(schema.authCredentialLinks)
        .where(eq(schema.authCredentialLinks.userId, accountRows[0].id));
      expect(credentialRows).toHaveLength(1);
      expect(credentialRows[0]).toMatchObject({
        accountId: accountRows[0].id,
        providerId: 'credential',
        userId: accountRows[0].id
      });
      expect(credentialRows[0].issuer).toBeTruthy();
      expect(credentialRows[0].password).not.toBe(password);

      const signIn = await auth.handler(
        jsonRequest('/sign-in/email', {
          email: 'foundation-auth@example.test',
          password
        })
      );
      expect(signIn.status).toBe(200);
      const cookie = sessionCookie(signIn);

      const sessionRows = await database
        .select()
        .from(schema.sessions)
        .where(eq(schema.sessions.userId, accountRows[0].id));
      expect(sessionRows).toHaveLength(1);
      expect(sessionRows.some((session) => cookie.includes(session.token))).toBe(true);

      const authenticated = await auth.handler(
        new Request(`${baseURL}/api/auth/get-session`, {
          headers: { Cookie: cookie }
        })
      );
      expect(authenticated.status).toBe(200);
      expect(await authenticated.json()).toMatchObject({
        user: {
          id: accountRows[0].id,
          email: 'foundation-auth@example.test'
        }
      });

      const signedInSession = sessionRows.find((session) => cookie.includes(session.token));
      expect(signedInSession).toBeDefined();
      await database
        .delete(schema.sessions)
        .where(eq(schema.sessions.id, signedInSession!.id));

      const revoked = await auth.handler(
        new Request(`${baseURL}/api/auth/get-session`, {
          headers: { Cookie: cookie }
        })
      );
      expect(revoked.status).toBe(200);
      expect(await revoked.json()).toBeNull();
    } finally {
      await client.close();
    }
  });
});
