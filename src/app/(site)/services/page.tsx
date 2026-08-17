import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import { getServices } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Construction, painting and interior fit-out in Chennai — HK Builder runs all three in-house as one accountable team.',
  path: '/services',
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">What We Do</span>
          <h1>One builder, every layer of the build.</h1>
        </div>
        <p>
          From structure to the final coat of paint — construction, painting and interiors as one
          accountable team, not three vendors.
        </p>
      </Reveal>

      <Stagger className="service-grid" y={60} stagger={0.14}>
        {services.map((s: any) => (
          <SpotlightCard className="service-card" spotlightColor="rgba(201, 162, 39, 0.16)" key={s.idx}>
            <div className="service-body">
              <span className="idx">{s.idx}</span>
              <svg className="icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d={s.icon} stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
            </div>
          </SpotlightCard>
        ))}
      </Stagger>
    </section>
  );
}
