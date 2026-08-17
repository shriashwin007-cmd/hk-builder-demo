'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Cascade a container's children into view. */
export default function Stagger({
  children,
  as: Tag = 'div',
  className = '',
  y = 48,
  stagger = 0.12,
  duration = 0.9,
  start = 'top 82%',
  selector = undefined,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.classList.add('in');

      const targets = selector ? el.querySelectorAll(selector) : el.children;
      if (!targets.length || reduced) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    { scope: ref, dependencies: [reduced, y, stagger, duration, start, selector] }
  );

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
