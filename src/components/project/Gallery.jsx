'use client';

import { useEffect, useState } from 'react';
import Stagger from '@/components/motion/Stagger';

export default function Gallery({ items = [] }) {
  const [open, setOpen] = useState(-1);
  const has = items.length > 0;

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, items.length]);

  if (!has) return null;
  const current = items[open];

  return (
    <section id="gallery" className="page-section">
      <Stagger className="gallery-grid" y={40} stagger={0.08}>
        {items.map((it, i) => (
          <button type="button" className="gallery-item" key={it.image} onClick={() => setOpen(i)}>
            <img src={it.image} alt={it.alt ?? it.label ?? ''} loading="lazy" />
            <span className="gallery-item__label">{it.label}</span>
            {/* Enforced label: these are AI-generated placeholders, and
                presenting them as photographs would be misleading. */}
            {it.imageType === 'artists-impression' ? (
              <span className="gallery-item__disclaimer mono">Artist&apos;s impression</span>
            ) : null}
          </button>
        ))}
      </Stagger>

      {open >= 0 ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.label}>
          <button className="lightbox__close" onClick={() => setOpen(-1)} aria-label="Close">
            ×
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => setOpen((i) => (i - 1 + items.length) % items.length)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <figure className="lightbox__figure">
            <img src={current.image} alt={current.alt ?? current.label ?? ''} />
            <figcaption>
              {current.label}
              {current.imageType === 'artists-impression' ? (
                <span className="mono"> · Artist&apos;s impression</span>
              ) : null}
            </figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => setOpen((i) => (i + 1) % items.length)}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
