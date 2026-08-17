import Reveal from '@/components/motion/Reveal';
import EnquiryForm from '@/components/marketing/EnquiryForm';
import { getSiteSettings } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { issueTimestamp } from '@/lib/security/hmac';

export const metadata = buildMetadata({
  title: 'Contact & Site Visits',
  description:
    'Book a site visit or send an enquiry to HK Builder, Chennai. Site visits open daily at SP Galaxy, Nolambur.',
  path: '/contact',
});

// The signed timestamp must be minted per request, so this page is dynamic.
export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const ts = issueTimestamp();

  const today = new Date();
  const min = new Date(today.getTime() + 86400000).toISOString().slice(0, 10);
  const max = new Date(today.getTime() + 60 * 86400000).toISOString().slice(0, 10);
  const addr = settings.address ?? {};

  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Get in touch</span>
          <h1>Book a site visit.</h1>
        </div>
        <p>Site visits open daily. Tell us when suits and we&apos;ll confirm by phone.</p>
      </Reveal>

      <Reveal className="contact-grid">
        <EnquiryForm ts={ts} intent="site-visit" project="SP Galaxy" minDate={min} maxDate={max} />

        <aside className="contact-aside">
          <h2>Project office</h2>
          <address>
            {addr.line1}
            <br />
            {addr.line2}
            <br />
            {addr.city} – {addr.postalCode}
          </address>

          <h3>Call</h3>
          {settings.phones?.map((p: string) => (
            <a className="contact-line" key={p} href={`tel:${p}`}>
              {p}
            </a>
          ))}

          <h3>Email</h3>
          <a className="contact-line" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>

          <h3>Hours</h3>
          <p className="mono">{settings.officeHours}</p>
        </aside>
      </Reveal>
    </section>
  );
}
