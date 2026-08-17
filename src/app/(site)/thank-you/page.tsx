import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = {
  ...buildMetadata({
    title: 'Thank you',
    description: 'Your enquiry has been received.',
    path: '/thank-you',
  }),
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="page-section page-section--center">
      <Reveal className="thanks">
        <span className="tag mono">Enquiry received</span>
        <h1>Thank you — we&apos;ll be in touch.</h1>
        <p>
          Our team will call you back shortly. For anything urgent, reach us directly on the numbers
          in the footer.
        </p>
        <Link href="/" className="btn btn-gold">
          Back to home →
        </Link>
      </Reveal>
    </section>
  );
}
