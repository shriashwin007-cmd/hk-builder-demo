import { SITE_NAME, SITE_URL, absoluteUrl } from './site';

/** Build page metadata with canonical + OG/Twitter in one place. */
export function buildMetadata({ title, description, path = '/', image = '/img/gal-living.jpg' }) {
  const url = absoluteUrl(path);
  const fullTitle = path === '/' ? `${title}` : `${title} — ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function localBusinessJsonLd(settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE_NAME,
    description: settings.description,
    url: SITE_URL,
    telephone: settings.phones?.map((p) => `+91${String(p).replace(/\D/g, '')}`),
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [settings.address?.line1, settings.address?.line2].filter(Boolean).join(', '),
      addressLocality: settings.address?.city,
      postalCode: settings.address?.postalCode,
      addressCountry: settings.address?.country ?? 'IN',
    },
    ...(settings.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: settings.geo.lat, longitude: settings.geo.lng } }
      : null),
    areaServed: 'Chennai, Tamil Nadu',
  };
}

export function residenceJsonLd(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    numberOfAccommodationUnits: project.floorPlans?.length,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location?.area,
      addressRegion: project.location?.state,
      addressCountry: 'IN',
    },
    ...(project.location?.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: project.location.geo.lat,
            longitude: project.location.geo.lng,
          },
        }
      : null),
    amenityFeature: project.amenities?.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a.label,
      value: true,
    })),
  };
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
