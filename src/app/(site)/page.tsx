import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Project from '@/components/Project';
import FloorPlans from '@/components/FloorPlans';
import Location from '@/components/Location';
import Trust from '@/components/Trust';
import FaqAccordion from '@/components/marketing/FaqAccordion';
import Testimonials from '@/components/marketing/Testimonials';
import EmiCalculator from '@/components/marketing/EmiCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { getSiteSettings, getFaqs, getTestimonials } from '@/lib/content';
import { buildMetadata, localBusinessJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'HK Builder — Crafting Communities | Builders in Chennai',
  description:
    'HK Builder designs, constructs, paints and finishes homes in Chennai — full-stack, under one roof. Explore SP Galaxy, our CMDA-approved premium 3BHK residence in Nolambur.',
  path: '/',
});

export default async function HomePage() {
  const [settings, faqs, testimonials] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getTestimonials(),
  ]);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <Services />
      <Project />
      <FloorPlans />
      <Location />
      <EmiCalculator />
      <Testimonials items={testimonials} />
      <FaqAccordion items={faqs} />
      <Trust />
    </>
  );
}
