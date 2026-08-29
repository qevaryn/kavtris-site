import 'server-only';

import { headers } from 'next/headers';
import { getAuth } from '@/server/auth/auth';

export async function getServerSession() {
  return getAuth().api.getSession({
    headers: await headers()
  });
}
