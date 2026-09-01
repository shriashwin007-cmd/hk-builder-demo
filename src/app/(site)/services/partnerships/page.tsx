import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { getPartnerships } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Strategic Partnerships & Joint Ventures',
  description:
    'HK Builder combines construction expertise, financial strength and technical capability with strategic partners to deliver landmark residential, commercial and industrial projects.',
  path: '/services/partnerships',
});

export default async function PartnershipsPage() {
  const partnerships = await getPartnerships();

  return (
    <section className="page-section partnerships">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">
            <Link href="/services">Services</Link> / Partnerships
          </span>
          <h1>{partnerships.title}</h1>
        </div>
        <p>{partnerships.intro}</p>
      </Reveal>

      <div className="partnerships-grid">
        <Reveal className="partnerships-block">
          <h2>{partnerships.whyTitle}</h2>
          <ul className="prose-list">
            {partnerships.why.map((w: any) => (
              <li key={w.title}>
                <strong>{w.title}:</strong> {w.desc}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="partnerships-block" delay={0.08}>
          <h2>{partnerships.modelTitle}</h2>
          <p>{partnerships.model}</p>
        </Reveal>
      </div>

      <Reveal className="partnerships-sectors">
        <h2>{partnerships.sectorsTitle}</h2>
        <p className="prose">{partnerships.sectorsIntro}</p>
        <div className="sector-grid">
          {partnerships.sectors.map((s: any) => (
            <div className="sector-card" key={s.title}>
              <h3>{s.title}</h3>
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
  );
}
