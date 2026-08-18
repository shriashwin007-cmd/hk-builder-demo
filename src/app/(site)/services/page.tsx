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
    <>
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
              <div className="service-body">
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
              </div>
            </SpotlightCard>
          ))}
        </Stagger>
      </section>

      {/* Contracting sub-services — the only category with per-trade detail. */}
      <section className="page-section">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">Contracting</span>
            <h2>Nine trades, one point of contact.</h2>
          </div>
          <p>Specialist trade work handled in-house from demolition through to final finishes.</p>
        </Reveal>
        <Stagger className="trade-grid" y={40} stagger={0.06}>
          {(services.find((s: any) => s.title === 'Contracting')?.categories ?? []).map((c: any) => (
            <div className="trade-card" key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </Stagger>
      </section>

      <section className="page-section partnerships">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">{partnerships.eyebrow}</span>
            <h2>{partnerships.title}</h2>
          </div>
          <p>{partnerships.intro}</p>
        </Reveal>

        <div className="partnerships-grid">
          <Reveal className="partnerships-block">
            <h3>{partnerships.whyTitle}</h3>
            <ul className="prose-list">
              {partnerships.why.map((w: any) => (
                <li key={w.title}>
                  <strong>{w.title}:</strong> {w.desc}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="partnerships-block" delay={0.08}>
            <h3>{partnerships.modelTitle}</h3>
            <p>{partnerships.model}</p>
          </Reveal>
        </div>

        <Reveal className="partnerships-sectors">
          <h3>{partnerships.sectorsTitle}</h3>
          <p className="prose">{partnerships.sectorsIntro}</p>
          <div className="sector-grid">
            {partnerships.sectors.map((s: any) => (
              <div className="sector-card" key={s.title}>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="partnerships-cta">
          <Link href="/contact" className="btn btn-gold">
            Discuss a partnership →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
