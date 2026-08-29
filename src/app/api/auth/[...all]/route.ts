import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '@/server/auth/auth';

export const runtime = 'nodejs';

export const { GET, POST } = toNextJsHandler(getAuth());
