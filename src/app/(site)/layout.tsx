// The global stylesheet is imported HERE, not in the root layout, so its
// aggressive resets never reach the embedded Sanity Studio at /studio.
import '@/styles/index.css';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollTriggerRefresh from '@/components/motion/ScrollTriggerRefresh';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import { getSiteSettings } from '@/lib/content';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollTriggerRefresh />
      <Nav />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFab
        number={settings.whatsapp}
        message={`Hi HK Builder, I'd like to know more about SP Galaxy.`}
      />
    </>
  );
}
