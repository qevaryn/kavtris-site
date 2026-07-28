import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 }
  ];
}
