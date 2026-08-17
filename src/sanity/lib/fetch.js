import { apiVersion, dataset, projectId, isSanityConfigured } from './env';

/**
 * Read from Sanity over the plain HTTP query API.
 *
 * Deliberately avoids the Sanity client SDK: reads are a single GET, and
 * keeping the dependency out means the marketing bundle and build time are
 * unaffected. Returns null when unconfigured so the content adapter can fall
 * back without throwing.
 */
export async function sanityFetch(query, params = {}, { revalidate = 60, tags = [] } = {}) {
  if (!isSanityConfigured) return null;

  const search = new URLSearchParams({ query });
  for (const [k, v] of Object.entries(params)) {
    search.set(`$${k}`, JSON.stringify(v));
  }

  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  try {
    const res = await fetch(url, { next: { revalidate, tags } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.result ?? null;
  } catch {
    // A CMS outage must not take the marketing site down; the adapter falls
    // back to bundled content.
    return null;
  }
}
