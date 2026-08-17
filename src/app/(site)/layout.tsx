// The global stylesheet is imported HERE, not in the root layout, so its
// aggressive resets never reach the embedded Sanity Studio at /studio.
import '@/styles/index.css';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollTriggerRefresh from '@/components/motion/ScrollTriggerRefresh';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollTriggerRefresh />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
