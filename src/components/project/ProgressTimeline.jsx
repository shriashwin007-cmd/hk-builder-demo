import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

export default function ProgressTimeline({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="progress" className="page-section">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Construction Progress</span>
          <h2>Track the build.</h2>
        </div>
      </Reveal>
      <Stagger className="timeline" y={30} stagger={0.1}>
        {items.map((m, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-item__date mono">{m.date}</div>
            <div className="timeline-item__body">
              <h3>{m.title}</h3>
              {m.description ? <p>{m.description}</p> : null}
              {typeof m.percentComplete === 'number' ? (
                <div
                  className="timeline-bar"
                  role="progressbar"
                  aria-valuenow={m.percentComplete}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: `${m.percentComplete}%` }} />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
