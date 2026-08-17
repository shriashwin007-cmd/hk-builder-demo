import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Project from '@/components/Project';
import FloorPlans from '@/components/FloorPlans';
import Location from '@/components/Location';
import Trust from '@/components/Trust';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Project />
      <FloorPlans />
      <Location />
      <Trust />
    </>
  );
}
