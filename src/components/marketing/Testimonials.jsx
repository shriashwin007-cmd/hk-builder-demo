import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

export default function Testimonials({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="testimonials" className="testimonials">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">In Their Words</span>
          <h2>What owners say.</h2>
        </div>
      </Reveal>
      <Stagger className="testimonial-grid" y={40} stagger={0.12}>
        {items.map((t, i) => (
          <figure className="testimonial" key={i}>
            <blockquote>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{t.author}</strong>
              {t.role ? <span>{t.role}</span> : null}
            </figcaption>
          </figure>
        ))}
      </Stagger>
    </section>
  );
}
