import { notFound } from 'next/navigation';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import JsonLd from '@/components/seo/JsonLd';
import FloorPlanTabs from '@/components/project/FloorPlanTabs';
import Gallery from '@/components/project/Gallery';
import ProgressTimeline from '@/components/project/ProgressTimeline';
import { getProject, getProjects } from '@/lib/content';
import { buildMetadata, residenceJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return buildMetadata({ title: 'Project not found', description: '', path: '/projects' });

  return buildMetadata({
    title: `${project.title}, ${project.location?.area}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.gallery?.[0]?.image ?? '/img/gal-living.jpg',
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={residenceJsonLd(project)} />

      <section className="page-section project-hero">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">
              {project.approvals?.join(' · ')} · {project.location?.area}, {project.location?.city}
            </span>
            <h1>
              {project.title}, {project.location?.area}
            </h1>
          </div>
          <p>{project.summary}</p>
        </Reveal>

        <Stagger className="highlight-row" y={30} stagger={0.1}>
          {project.highlights?.map((h: any) => (
            <div className="highlight" key={h.label}>
              <div className="highlight__value">{h.value}</div>
              <div className="highlight__label mono">{h.label}</div>
            </div>
          ))}
        </Stagger>
      </section>

      <Gallery items={project.gallery ?? []} />

      <section className="page-section">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">Specifications</span>
            <h2>Built to spec, line by line.</h2>
          </div>
        </Reveal>
        <Reveal className="spec-list">
          {project.specs?.map((s: any) => (
            <div className="spec-row" key={s.key}>
              <div className="k">{s.key}</div>
              <div className="v">{s.value}</div>
            </div>
          ))}
        </Reveal>
      </section>

      <FloorPlanTabs plans={project.floorPlans ?? []} />

      <section className="page-section">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">Amenities</span>
            <h2>What&apos;s included.</h2>
          </div>
        </Reveal>
        <Stagger className="amenity-grid" y={30} stagger={0.06}>
          {project.amenities?.map((a: any) => (
            <div className="amenity" key={a.label}>
              {a.label}
            </div>
          ))}
        </Stagger>
      </section>

      <ProgressTimeline items={project.progress ?? []} />

      <section className="page-section location" id="location">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">Location Advantage</span>
            <h2>{project.location?.area}, well within reach.</h2>
          </div>
        </Reveal>
        <Stagger className="loc-grid" y={50} stagger={0.1}>
          {project.location?.nearby?.map((col: any) => (
            <div className="loc-col" key={col.category}>
              <h3>{col.category}</h3>
              {col.places.map((pl: any) => (
                <div className="loc-item" key={pl.name}>
                  <span>{pl.name}</span>
                  <span>{pl.distanceKm} km</span>
                </div>
              ))}
            </div>
          ))}
        </Stagger>
      </section>
    </>
  );
}
