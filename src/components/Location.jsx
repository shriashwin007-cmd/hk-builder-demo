import { location } from '../data/content';
import Reveal from './motion/Reveal';
import Stagger from './motion/Stagger';

export default function Location() {
  return (
    <section id="location" className="location">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Location Advantage</span>
          <h2>Nolambur, well within reach.</h2>
        </div>
        <p>Schools, hospitals, colleges and workplaces — all inside a short drive from SP Galaxy.</p>
      </Reveal>
      <Stagger className="loc-grid" y={50} stagger={0.1}>
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
      </Stagger>
    </section>
  );
}
