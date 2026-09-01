import { notFound } from 'next/navigation';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import { getServices, getServiceBySlug } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return buildMetadata({
      title: 'Services',
      description: 'HK Builder services in Chennai.',
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: `${service.desc} — HK Builder, Chennai.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const hasTradeDetail = service.categories.every((c: any) => typeof c === 'object');

  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">
            <Link href="/services">Services</Link> / {service.title}
          </span>
          <h1>{service.title}</h1>
        </div>
        <p>{service.desc}</p>
      </Reveal>

      {hasTradeDetail ? (
        <Stagger className="trade-grid" y={40} stagger={0.06}>
          {service.categories.map((c: any) => (
            <div className="trade-card" key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </Stagger>
      ) : (
        <Stagger className="service-category-grid" y={40} stagger={0.08}>
          {service.categories.map((c: any) => (
            <div className="service-category-card" key={c}>
              <h3>{c}</h3>
            </div>
          ))}
        </Stagger>
      )}

      <Reveal className="service-detail-cta">
        <Link href="/contact" className="btn btn-gold">
          Discuss your {service.title.toLowerCase()} project →
        </Link>
        <Link href="/services" className="service-back-link">
          ← Back to all services
        </Link>
      </Reveal>
    </section>
  );
}
