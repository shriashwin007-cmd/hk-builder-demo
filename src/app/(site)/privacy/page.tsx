import Reveal from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How HK Builder collects, uses and protects personal information submitted through this website.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Legal</span>
          <h1>Privacy Policy.</h1>
        </div>
      </Reveal>
      <Reveal className="prose">
        <p className="mono placeholder-note">
          PLACEHOLDER — this policy must be reviewed by the client before launch. India&apos;s DPDP
          Act 2023 applies to the enquiry form, and Google Ads will not approve landing pages
          without a published privacy policy.
        </p>
        <h2>What we collect</h2>
        <p>
          When you submit an enquiry or book a site visit we collect your name, phone number, email
          address and any message you send us.
        </p>
        <h2>How we use it</h2>
        <p>
          Solely to respond to your enquiry about our projects. We do not sell personal data to
          third parties.
        </p>
        <h2>Retention and your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your data at any time by
          contacting us using the details in the footer.
        </p>
      </Reveal>
    </section>
  );
}
