import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import Link from 'next/link';
import { getServices, getPartnerships } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Construction, interior fit-out and specialist trade contracting in Chennai — HK Builder runs all three in-house as one accountable team, plus strategic partnerships for landmark projects.',
  path: '/services',
});

export default async function ServicesPage() {
  const [services, partnerships] = await Promise.all([getServices(), getPartnerships()]);

  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">What We Do</span>
          <h1>One builder, every layer of the build.</h1>
        </div>
        <p>
          From structure to the final coat of paint — construction, interiors and contracting as one
          accountable team, not three vendors.
        </p>
      </Reveal>

      <Stagger className="service-grid" y={60} stagger={0.14}>
        {services.map((s: any) => (
          <SpotlightCard className="service-card" spotlightColor="rgba(201, 162, 39, 0.16)" key={s.idx}>
            <Link href={`/services/${s.slug}`} className="service-body">
              <span className="idx">{s.idx}</span>
              <svg className="icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d={s.icon} stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <div className="service-subcats">
                {s.categories.map((c: any) => (
                  <span key={typeof c === 'string' ? c : c.name}>{typeof c === 'string' ? c : c.name}</span>
                ))}
              </div>
              <span className="service-link mono">View {s.title.toLowerCase()} →</span>
            </Link>
          </SpotlightCard>
        ))}
      </Stagger>

      <Reveal className="services-partnerships-teaser" y={40}>
        <div>
          <span className="tag mono">{partnerships.eyebrow}</span>
          <h2>{partnerships.title}</h2>
          <p>{partnerships.intro}</p>
        </div>
        <Link href="/services/partnerships" className="btn btn-gold">
          Explore partnerships →
        </Link>
      </Reveal>
    </section>
  );
}
