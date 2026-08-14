import { useReveal, useStagger } from '../hooks/useReveal';
import { location } from '../data/content';

export default function Location() {
  const headRef = useReveal();
  const gridRef = useStagger({ y: 50, stagger: 0.1 });

  return (
    <section id="location" className="location">
      <div className="section-head reveal" ref={headRef}>
        <div>
          <span className="tag mono">Location Advantage</span>
          <h2>Nolambur, well within reach.</h2>
        </div>
        <p>Schools, hospitals, colleges and workplaces — all inside a short drive from SP Galaxy.</p>
      </div>
      <div className="loc-grid reveal" ref={gridRef}>
        {location.map((col) => (
          <div className="loc-col" key={col.title}>
            <h4>{col.title}</h4>
            {col.items.map(([name, dist]) => (
              <div className="loc-item" key={name}>
                <span>{name}</span>
                <span>{dist}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
