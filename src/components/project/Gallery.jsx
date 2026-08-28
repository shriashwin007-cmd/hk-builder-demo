'use client';

import { useEffect, useMemo, useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import AccordionGallery from '@/components/AccordionGallery/AccordionGallery';

export default function Gallery({ items = [] }) {
  const [open, setOpen] = useState(-1);
  const has = items.length > 0;

  const agItems = useMemo(
    () =>
      items.map((it) => ({
        image: it.image,
        alt: it.alt ?? it.label ?? '',
        label: it.imageType === 'artists-impression' ? `${it.label} · Artist's impression` : it.label,
      })),
    [items]
  );

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
      <Reveal className="gallery-accordion-wrap">
        <AccordionGallery
          items={agItems}
          defaultIndex={0}
          trigger="hover"
          height={560}
          gap={10}
          radius={4}
          expandRatio={0.5}
          accentColor="#C9A227"
          overlayColor="#0F2E1F"
          textColor="#F6F2E7"
          grayscale={false}
          duration={0.65}
          tilt={6}
          onExpandedClick={(i) => setOpen(i)}
        />
      </Reveal>
      <p className="gallery-hint mono">Hover to preview · click the open panel for full size</p>

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
