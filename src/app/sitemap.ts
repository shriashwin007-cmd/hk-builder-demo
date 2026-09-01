import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getProjects, getServices } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);
  const now = new Date();

  const staticRoutes = [
    '',
    '/projects',
    '/services',
    '/services/partnerships',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p: { slug: string }) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const serviceRoutes = services.map((s: { slug: string }) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
