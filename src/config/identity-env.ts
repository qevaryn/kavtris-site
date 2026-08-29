import 'server-only';

export type IdentityEnv = {
  databaseUrl: string;
  authSecret: string;
  authUrl: string;
  isProduction: boolean;
};

export function getIdentityEnv(env = process.env): IdentityEnv {
  const missingKeys = ['DATABASE_URL', 'BETTER_AUTH_SECRET'].filter(
    (key) => !env[key]
  );

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required identity environment variables: ${missingKeys.join(', ')}`
    );
  }

  const authSecret = env.BETTER_AUTH_SECRET as string;

  if (authSecret.length < 32) {
    throw new Error('BETTER_AUTH_SECRET must contain at least 32 characters.');
  }

  return {
    databaseUrl: env.DATABASE_URL as string,
    authSecret,
    authUrl: env.BETTER_AUTH_URL || 'http://localhost:3000',
    isProduction: env.NODE_ENV === 'production'
  };
}
