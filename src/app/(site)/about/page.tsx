import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import { getAbout } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Founded nearly 8 years ago, HK Builder builds homes across Chennai that are a solid asset, a peaceful sanctuary and a statement of lifestyle — engineered and finished in-house.',
  path: '/about',
});

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <section className="page-section">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">{about.eyebrow}</span>
            <h1>{about.title}</h1>
          </div>
        </Reveal>

        <Reveal className="prose">
          <p>{about.founding}</p>
        </Reveal>
      </section>

      <section className="page-section about-pillars">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">What We Believe</span>
            <h2>{about.beliefIntro}</h2>
          </div>
        </Reveal>

        <Stagger className="about-pillar-grid" y={40} stagger={0.1}>
          {about.pillars.map((p, i) => (
            <div className="about-pillar-card" key={p.title}>
              <span className="idx mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </Stagger>

        <Reveal className="prose about-closing">
          <p>{about.closing}</p>
        </Reveal>
      </section>
    </>
  );
}
