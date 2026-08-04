const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const submissions = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'local';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = submissions.get(key);

  if (!current || current.resetAt <= now) {
    submissions.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export function isContactRateLimited(request: Request) {
  return isRateLimited(getClientKey(request));
}
