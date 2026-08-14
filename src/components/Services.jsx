import { useReveal, useStagger } from '../hooks/useReveal';
import { services, galleryItems } from '../data/content';
import SpotlightCard from './SpotlightCard/SpotlightCard';
import AccordionGallery from './AccordionGallery/AccordionGallery';

export default function Services() {
  const headRef = useReveal();
  const galleryRef = useReveal({ y: 56 });
  const gridRef = useStagger({ y: 60, stagger: 0.14 });

  return (
    <section id="services" className="services">
      <div className="section-head reveal" ref={headRef}>
        <div>
          <span className="tag mono">What We Do</span>
          <h2>One builder, every layer of the build.</h2>
        </div>
        <p>
          From structure to the final coat of paint — HK Builder runs construction, painting and interiors as one
          accountable team, not three vendors.
        </p>
      </div>

      <div className="services-gallery reveal" ref={galleryRef}>
        <AccordionGallery
          items={galleryItems}
          defaultIndex={1}
          trigger="hover"
          height={460}
          gap={10}
          radius={4}
          expandRatio={0.46}
          accentColor="#C9A227"
          overlayColor="#0F2E1F"
          textColor="#F6F2E7"
          grayscale={false}
          duration={0.7}
          tilt={6}
        />
      </div>

      <div className="service-grid reveal" ref={gridRef}>
        {services.map((s) => (
          <SpotlightCard className="service-card" spotlightColor="rgba(201, 162, 39, 0.16)" key={s.idx}>
            <div className="service-body">
              <span className="idx">{s.idx}</span>
              <svg className="icon" viewBox="0 0 40 40" fill="none">
                <path d={s.icon} stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
