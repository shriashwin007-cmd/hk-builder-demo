import Link from 'next/link';
import Reveal from './motion/Reveal';
import { siteSettings as fallback } from '@/lib/content/fallback/site';

export default function Footer({ settings = fallback }) {
  const [primaryPhone, secondaryPhone] = settings.phones ?? [];
  const addr = settings.address ?? {};

  return (
    <footer id="contact-footer">
      <div className="footer-top">
        <Reveal className="footer-cta">
          <h2 className="outline-text">Let&apos;s build your next address.</h2>
          <p>
            Site visits open daily. Talk to our team about unit availability and loan partners.
          </p>
          <Link href="/contact" className="btn btn-gold">
            Book a site visit →
          </Link>
        </Reveal>

        <Reveal className="footer-col">
          <h4>Project Office</h4>
          <p>
            {addr.line1}
            <br />
            {addr.line2}
            <br />
            {addr.city} – {addr.postalCode}
          </p>
          {settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : null}
        </Reveal>

        <Reveal className="footer-col">
          <h4>Contact</h4>
          {primaryPhone ? <a href={`tel:${primaryPhone}`}>{primaryPhone}</a> : null}
          {secondaryPhone ? <a href={`tel:${secondaryPhone}`}>{secondaryPhone}</a> : null}
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
        </Reveal>
      </div>

      {/* Regulatory block. RERA number is legally required on marketing
          material for qualifying Tamil Nadu projects — see README. */}
      <div className="footer-legal">
        <p>
          {settings.reraNumber ? (
            <>TNRERA Registration No. {settings.reraNumber}</>
          ) : (
            <span className="footer-legal__todo">
              TNRERA registration number pending — must be published before launch.
            </span>
          )}
        </p>
        <p>
          Images marked “artist&apos;s impression” are indicative representations and not
          photographs of the completed property. Dimensions, specifications and finishes are subject
          to change and to approval by the competent authority.
        </p>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {settings.name} — {settings.tagline}
        </span>
        <span className="mono">{settings.officeHours}</span>
      </div>
    </footer>
  );
}
