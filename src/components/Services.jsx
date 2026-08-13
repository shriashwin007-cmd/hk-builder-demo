import { useReveal } from '../hooks/useReveal';
import { services } from '../data/content';
import SpotlightCard from './SpotlightCard/SpotlightCard';

export default function Services() {
  const headRef = useReveal();
  const gridRef = useReveal();

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
      <div className="service-grid reveal" ref={gridRef}>
        {services.map((s) => (
          <SpotlightCard className="service-card" spotlightColor="rgba(201, 162, 39, 0.16)" key={s.idx}>
            <div className="service-media">
              <img src={s.img} alt={s.alt} loading="lazy" />
            </div>
            <div className="service-body">
              <span className="idx">{s.idx}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
