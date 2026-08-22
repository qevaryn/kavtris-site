import { describe, expect, it } from 'vitest';
import {
  CONTACT_RATE_LIMIT_MAX_REQUESTS,
  CONTACT_RATE_LIMIT_WINDOW_MS,
  createContactRateLimiter,
  getContactRateLimitClientKey
} from './contact-rate-limit';

function contactRequest(headers: HeadersInit = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers
  });
}

describe('contact rate limiter', () => {
  it('allows the first 3 requests and limits the 4th and 5th requests', () => {
    let now = 0;
    const limiter = createContactRateLimiter({ now: () => now });
    const request = contactRequest({ 'x-forwarded-for': '203.0.113.10' });

    for (let index = 0; index < CONTACT_RATE_LIMIT_MAX_REQUESTS; index += 1) {
      expect(limiter.check(request)).toEqual({ limited: false });
    }

    expect(limiter.check(request)).toEqual({
      limited: true,
      retryAfterSeconds: CONTACT_RATE_LIMIT_WINDOW_MS / 1000
    });

    now = 1000;
    expect(limiter.check(request)).toEqual({
      limited: true,
      retryAfterSeconds: CONTACT_RATE_LIMIT_WINDOW_MS / 1000 - 1
    });
  });

  it('allows requests again at the reset boundary', () => {
    let now = 0;
    const limiter = createContactRateLimiter({ now: () => now });
    const request = contactRequest({ 'x-forwarded-for': '203.0.113.11' });

    for (let index = 0; index < CONTACT_RATE_LIMIT_MAX_REQUESTS; index += 1) {
      expect(limiter.check(request)).toEqual({ limited: false });
    }

    expect(limiter.check(request).limited).toBe(true);

    now = CONTACT_RATE_LIMIT_WINDOW_MS;

    expect(limiter.check(request)).toEqual({ limited: false });
  });

  it('isolates counters for different clients', () => {
    const limiter = createContactRateLimiter({ now: () => 0 });
    const firstClient = contactRequest({ 'x-forwarded-for': '203.0.113.12' });
    const secondClient = contactRequest({ 'x-forwarded-for': '203.0.113.13' });

    for (let index = 0; index < CONTACT_RATE_LIMIT_MAX_REQUESTS; index += 1) {
      expect(limiter.check(firstClient)).toEqual({ limited: false });
    }

    expect(limiter.check(firstClient).limited).toBe(true);
    expect(limiter.check(secondClient)).toEqual({ limited: false });
  });

  it('normalizes the client key from forwarded headers', () => {
    expect(getContactRateLimitClientKey(contactRequest({
      'x-forwarded-for': ' 203.0.113.14, 198.51.100.1 '
    }))).toBe('203.0.113.14');

    expect(getContactRateLimitClientKey(contactRequest({
      'x-forwarded-for': ' , not-an-ip ',
      'x-real-ip': ' 198.51.100.2 '
    }))).toBe('198.51.100.2');

    expect(getContactRateLimitClientKey(contactRequest({
      'x-forwarded-for': ' 2001:db8::1 '
    }))).toBe('2001:db8::1');

    expect(getContactRateLimitClientKey(contactRequest({
      'x-forwarded-for': 'not-an-ip, also-not-an-ip',
      'x-real-ip': ''
    }))).toBe('local');
  });

  it('keeps Retry-After positive and decreasing', () => {
    let now = 250;
    const limiter = createContactRateLimiter({ now: () => now });
    const request = contactRequest({ 'x-forwarded-for': '203.0.113.15' });

    for (let index = 0; index < CONTACT_RATE_LIMIT_MAX_REQUESTS; index += 1) {
      limiter.check(request);
    }

    const firstLimit = limiter.check(request);
    now = 1750;
    const secondLimit = limiter.check(request);

    expect(firstLimit.limited).toBe(true);
    expect(firstLimit.retryAfterSeconds).toBe(600);
    expect(secondLimit.limited).toBe(true);
    expect(secondLimit.retryAfterSeconds).toBe(599);
  });

  it('cleans up expired entries before tracking new clients', () => {
    let now = 0;
    const limiter = createContactRateLimiter({
      maxTrackedClients: 2,
      cleanupIntervalMs: 0,
      now: () => now
    });

    limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.16' }));
    limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.17' }));
    expect(limiter.getTrackedClientCount()).toBe(2);

    now = CONTACT_RATE_LIMIT_WINDOW_MS;
    limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.18' }));

    expect(limiter.getTrackedClientCount()).toBe(1);
  });

  it('keeps the client map bounded and evicts the oldest entry at capacity', () => {
    const limiter = createContactRateLimiter({
      maxTrackedClients: 2,
      now: () => 0
    });

    expect(() => {
      limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.19' }));
      limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.20' }));
      limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.21' }));
    }).not.toThrow();

    expect(limiter.getTrackedClientCount()).toBe(2);
    expect(limiter.check(contactRequest({ 'x-forwarded-for': '203.0.113.19' }))).toEqual({
      limited: false
    });
    expect(limiter.getTrackedClientCount()).toBe(2);
  });
});
