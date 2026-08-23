import { isIP } from 'node:net';

export const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const CONTACT_RATE_LIMIT_MAX_REQUESTS = 3;
export const CONTACT_RATE_LIMIT_MAX_TRACKED_CLIENTS = 4096;

const CONTACT_RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 1000;
const FALLBACK_CLIENT_KEY = 'local';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type ContactRateLimitDecision = {
  limited: boolean;
  retryAfterSeconds?: number;
};

type ContactRateLimiterOptions = {
  windowMs?: number;
  maxRequests?: number;
  maxTrackedClients?: number;
  cleanupIntervalMs?: number;
  now?: () => number;
};

export type ContactRateLimiter = {
  check: (request: Request) => ContactRateLimitDecision;
  getTrackedClientCount: () => number;
};

// This limiter is process-local and does not protect multiple independent server instances.
// A distributed limiter is required if this API is extracted or horizontally scaled.
export function createContactRateLimiter(options: ContactRateLimiterOptions = {}): ContactRateLimiter {
  const windowMs = options.windowMs ?? CONTACT_RATE_LIMIT_WINDOW_MS;
  const maxRequests = options.maxRequests ?? CONTACT_RATE_LIMIT_MAX_REQUESTS;
  const maxTrackedClients = options.maxTrackedClients ?? CONTACT_RATE_LIMIT_MAX_TRACKED_CLIENTS;
  const cleanupIntervalMs = options.cleanupIntervalMs ?? CONTACT_RATE_LIMIT_CLEANUP_INTERVAL_MS;
  const now = options.now ?? Date.now;
  const submissions = new Map<string, RateLimitEntry>();
  let nextCleanupAt = 0;

  function removeExpiredEntries(nowMs: number) {
    for (const [key, entry] of submissions) {
      if (entry.resetAt <= nowMs) {
        submissions.delete(key);
      }
    }
  }

  function cleanupExpiredEntries(nowMs: number) {
    if (nowMs < nextCleanupAt) {
      return;
    }

    removeExpiredEntries(nowMs);
    nextCleanupAt = nowMs + cleanupIntervalMs;
  }

  function ensureCapacity(nowMs: number) {
    if (submissions.size < maxTrackedClients) {
      return;
    }

    removeExpiredEntries(nowMs);

    if (submissions.size < maxTrackedClients) {
      return;
    }

    const oldestClientKey = submissions.keys().next().value;

    if (oldestClientKey) {
      submissions.delete(oldestClientKey);
    }
  }

  return {
    check(request: Request) {
      const nowMs = now();
      cleanupExpiredEntries(nowMs);

      const key = getContactRateLimitClientKey(request);
      const current = submissions.get(key);

      if (!current || current.resetAt <= nowMs) {
        ensureCapacity(nowMs);
        submissions.set(key, { count: 1, resetAt: nowMs + windowMs });
        return { limited: false };
      }

      current.count += 1;

      if (current.count <= maxRequests) {
        return { limited: false };
      }

      return {
        limited: true,
        retryAfterSeconds: getRetryAfterSeconds(current.resetAt, nowMs)
      };
    },
    getTrackedClientCount() {
      return submissions.size;
    }
  };
}

const contactRateLimiter = createContactRateLimiter();

export function checkContactRateLimit(request: Request): ContactRateLimitDecision {
  return contactRateLimiter.check(request);
}

// These headers are only trusted after upstream proxy normalization.
export function getContactRateLimitClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const forwardedClient = forwardedFor
    ?.split(',')
    .map((token) => token.trim())
    .find(isValidIpToken);

  if (forwardedClient) {
    return forwardedClient;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();

  if (realIp && isValidIpToken(realIp)) {
    return realIp;
  }

  return FALLBACK_CLIENT_KEY;
}

function isValidIpToken(value: string) {
  return value.length > 0 && isIP(value) !== 0;
}

function getRetryAfterSeconds(resetAt: number, nowMs: number) {
  return Math.max(1, Math.ceil((resetAt - nowMs) / 1000));
}
