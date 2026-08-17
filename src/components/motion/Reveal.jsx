'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Fade + rise its children into view.
 *
 * This is a wrapper rather than a hook so the sections that use it can stay
 * server components — only this leaf ships to the client.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  y = 40,
  duration = 1,
  delay = 0,
  start = 'top 85%',
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.classList.add('in');
      if (reduced) return;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    { scope: ref, dependencies: [reduced, y, duration, delay, start] }
  );

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
