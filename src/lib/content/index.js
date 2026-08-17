/**
 * The content adapter.
 *
 * Pages only ever call these functions — never Sanity directly. That keeps the
 * whole site buildable and reviewable before any CMS credentials exist, and
 * means a schema rename can't reach the UI.
 *
 * Set CONTENT_SOURCE=sanity (plus the Sanity env vars) to switch sources.
 */
import { siteSettings } from './fallback/site';
import { projects, layouts } from './fallback/projects';
import { services, testimonials, faqs } from './fallback/misc';

const SOURCE =
  process.env.CONTENT_SOURCE === 'sanity' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? 'sanity'
    : 'fallback';

export function getContentSource() {
  return SOURCE;
}

export async function getSiteSettings() {
  if (SOURCE === 'sanity') {
    const { sanityFetch } = await import('@/sanity/lib/fetch');
    const { siteSettingsQuery } = await import('@/sanity/lib/queries');
    const doc = await sanityFetch(siteSettingsQuery);
    if (doc) return doc;
  }
  return siteSettings;
}

export async function getProjects() {
  if (SOURCE === 'sanity') {
    const { sanityFetch } = await import('@/sanity/lib/fetch');
    const { projectsQuery } = await import('@/sanity/lib/queries');
    const docs = await sanityFetch(projectsQuery);
    if (docs?.length) return docs;
  }
  return [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getProject(slug) {
  if (SOURCE === 'sanity') {
    const { sanityFetch } = await import('@/sanity/lib/fetch');
    const { projectBySlugQuery } = await import('@/sanity/lib/queries');
    const doc = await sanityFetch(projectBySlugQuery, { slug });
    if (doc) return doc;
  }
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProject() {
  const all = await getProjects();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export async function getServices() {
  return services;
}

export async function getTestimonials() {
  if (SOURCE === 'sanity') {
    const { sanityFetch } = await import('@/sanity/lib/fetch');
    const { testimonialsQuery } = await import('@/sanity/lib/queries');
    const docs = await sanityFetch(testimonialsQuery);
    if (docs?.length) return docs;
  }
  return testimonials;
}

export async function getFaqs() {
  if (SOURCE === 'sanity') {
    const { sanityFetch } = await import('@/sanity/lib/fetch');
    const { faqsQuery } = await import('@/sanity/lib/queries');
    const docs = await sanityFetch(faqsQuery);
    if (docs?.length) return docs;
  }
  return faqs;
}

export { layouts };
