import Reveal from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms governing use of the HK Builder website.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Legal</span>
          <h1>Terms of Use.</h1>
        </div>
      </Reveal>
      <Reveal className="prose">
        <p className="mono placeholder-note">
          PLACEHOLDER — to be reviewed by the client before launch.
        </p>
        <h2>Indicative content</h2>
        <p>
          Images described as an artist&apos;s impression are indicative and do not depict the
          completed property. Dimensions, specifications, finishes and pricing are subject to change
          and to approval by the competent authority. Nothing on this website constitutes an offer
          or a contract.
        </p>
      </Reveal>
    </section>
  );
}
