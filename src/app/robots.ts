import type { MetadataRoute } from 'next';
import { shouldIndexSite, siteUrl } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: shouldIndexSite ? '/' : undefined, disallow: shouldIndexSite ? undefined : '/' }],
    sitemap: shouldIndexSite ? `${siteUrl}/sitemap.xml` : undefined
  };
}
