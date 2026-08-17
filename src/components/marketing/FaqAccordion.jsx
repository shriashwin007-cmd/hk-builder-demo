'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';

export default function FaqAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  if (!items.length) return null;

  return (
    <section id="faq" className="faq">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Questions</span>
          <h2>Frequently asked.</h2>
        </div>
        <p>Anything else, call us — we answer the phone.</p>
      </Reveal>

      <Reveal className="faq-list">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={f.question}>
              <h3>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className="faq-a"
                hidden={!isOpen}
              >
                <p>{f.answer}</p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
