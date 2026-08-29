import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '@/server/auth/auth';

export const runtime = 'nodejs';

// Defer auth instantiation to request time so that importing this module during
// build-time page-data collection does not require identity environment variables
// (DATABASE_URL / BETTER_AUTH_SECRET) to be present. getAuth() is memoized on
// first call, so the Better Auth instance is created once per server process.
const handler = toNextJsHandler((request) => getAuth().handler(request));

export const { GET, POST } = handler;
