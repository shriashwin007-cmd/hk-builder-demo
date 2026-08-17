import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The Studio is an authenticated app; an indexed login page is noise.
        disallow: ['/studio', '/studio/', '/api/', '/thank-you'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
