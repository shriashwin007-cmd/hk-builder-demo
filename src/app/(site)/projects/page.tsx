import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import { getProjects } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Projects',
  description: 'Residential projects by HK Builder across Chennai — CMDA-approved, built and finished in-house.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Our Work</span>
          <h1>Projects.</h1>
        </div>
        <p>Every project built, painted and finished by one accountable team.</p>
      </Reveal>

      <Stagger className="project-grid" y={50} stagger={0.12}>
        {projects.map((p: any) => (
          <Link className="project-card" href={`/projects/${p.slug}`} key={p.slug}>
            <div className="project-card__media">
              {p.gallery?.[0] ? (
                <img src={p.gallery[0].image} alt={p.gallery[0].alt ?? p.title} loading="lazy" />
              ) : null}
              <span className={`project-status project-status--${p.status}`}>{p.status}</span>
            </div>
            <div className="project-card__body">
              <h2>{p.title}</h2>
              <p className="project-card__loc mono">
                {p.location?.area}, {p.location?.city}
              </p>
              <p>{p.summary}</p>
              <span className="project-card__cta">View project →</span>
            </div>
          </Link>
        ))}
      </Stagger>
    </section>
  );
}
