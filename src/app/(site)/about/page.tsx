import Reveal from '@/components/motion/Reveal';
import { getSiteSettings } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'HK Builder — a Chennai construction company handling structure, painting and interiors in-house.',
  path: '/about',
});

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">About Us</span>
          <h1>Built by one team, end to end.</h1>
        </div>
        <p>{settings.description}</p>
      </Reveal>

      <Reveal className="prose">
        {/* PLACEHOLDER COPY — replace with the client's real company story. */}
        <p>
          HK Builder is a Chennai-based construction company working across structure, painting and
          interior fit-out. Running all three in-house means a single point of accountability from
          foundation to handover — no coordination gaps between separate contractors.
        </p>
        <p>
          Our projects are built to IS 13920 / IS 456 / SP 16 standards with Seismic Zone III ductile
          detailing, and are delivered CMDA-approved with home-loan partnerships already in place.
        </p>
        <p className="mono placeholder-note">
          Placeholder copy — company history, team and credentials to be supplied by the client.
        </p>
      </Reveal>
    </section>
  );
}
