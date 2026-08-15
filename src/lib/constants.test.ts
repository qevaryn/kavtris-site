import { describe, expect, it } from 'vitest';

import { resolveSiteUrl } from './constants';

describe('resolveSiteUrl', () => {
  it('uses NEXT_PUBLIC_SITE_URL when explicitly configured', () => {
    expect(resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: 'https://kavtris.vercel.app',
      VERCEL_PROJECT_PRODUCTION_URL: 'project-domain.vercel.app',
      VERCEL_URL: 'preview-domain.vercel.app'
    })).toBe('https://kavtris.vercel.app');
  });

  it('uses VERCEL_PROJECT_PRODUCTION_URL before deployment URLs', () => {
    expect(resolveSiteUrl({
      VERCEL_PROJECT_PRODUCTION_URL: 'kavtris.vercel.app',
      VERCEL_URL: 'deployment-preview.vercel.app'
    })).toBe('https://kavtris.vercel.app');
  });

  it('uses VERCEL_URL as the preview or deployment fallback', () => {
    expect(resolveSiteUrl({
      VERCEL_URL: 'kavtris-git-branch-tech-gabriel1.vercel.app'
    })).toBe('https://kavtris-git-branch-tech-gabriel1.vercel.app');
  });

  it('uses localhost when no public URL or Vercel URL is available', () => {
    expect(resolveSiteUrl({})).toBe('http://localhost:3000');
  });

  it('does not produce the legacy project URL from production fallback configuration', () => {
    expect(resolveSiteUrl({
      VERCEL_PROJECT_PRODUCTION_URL: 'kavtris.vercel.app',
      VERCEL_URL: 'qevaryn-site-generated-deployment.vercel.app'
    })).not.toContain('qevaryn-site.vercel.app');
  });
});
