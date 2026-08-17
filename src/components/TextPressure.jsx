'use client';

// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
//
// Deviations from the upstream React Bits version, all deliberate:
//  - The heading exposes one contiguous text node for assistive tech and
//    crawlers; the per-character spans are decorative.
//  - The rAF loop is gated on reduced-motion, fine pointer, viewport
//    intersection and tab visibility, and parks itself once the lerp settles.
//    Upstream runs it forever on every device.
//  - Font sizing is CSS (container query units) rather than JS, because the
//    upstream measure-then-setState pass shifts the LCP element.
//  - No injected <style> with an @import; fonts come from next/font and the
//    static rules live in index.css.

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'var(--font-display)',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  as: Tag = 'h1',
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  const [canHover, setCanHover] = useState(false);
  const reduced = usePrefersReducedMotion();
  const chars = Array.from(text);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(mql.matches);
    sync();
    mql.addEventListener('change', sync);
    return () => mql.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    // Mouse-driven effect: pointless and battery-hostile on touch devices.
    if (reduced || !canHover) return;

    const container = containerRef.current;
    if (!container) return;

    let visible = false;

    const applyVariation = () => {
      const title = titleRef.current;
      if (!title) return;
      const maxDist = title.getBoundingClientRect().width / 2;

      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const d = dist(mouseRef.current, {
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        });

        const parts = [];
        if (weight) parts.push(`'wght' ${Math.floor(getAttr(d, maxDist, 100, 900))}`);
        if (width) parts.push(`'wdth' ${Math.floor(getAttr(d, maxDist, 5, 200))}`);
        if (italic) parts.push(`'ital' ${getAttr(d, maxDist, 0, 1).toFixed(2)}`);

        const next = parts.join(', ');
        if (next && span.style.fontVariationSettings !== next) {
          span.style.fontVariationSettings = next;
        }
        if (alpha) {
          const a = getAttr(d, maxDist, 0, 1).toFixed(2);
          if (span.style.opacity !== a) span.style.opacity = a;
        }
      });
    };

    const tick = () => {
      const dx = cursorRef.current.x - mouseRef.current.x;
      const dy = cursorRef.current.y - mouseRef.current.y;
      mouseRef.current.x += dx / 15;
      mouseRef.current.y += dy / 15;

      applyVariation();

      // Park the loop once it has converged; a pointer move restarts it.
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        runningRef.current = false;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (runningRef.current || !visible || document.visibilityState !== 'visible') return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      start();
    };

    const rect = container.getBoundingClientRect();
    mouseRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    cursorRef.current = { ...mouseRef.current };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') start();
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced, canHover, width, weight, italic, alpha]);

  const cls = ['text-pressure-title', className, flex ? 'flex' : '', stroke ? 'stroke' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className="text-pressure-wrap">
      <Tag
        ref={titleRef}
        className={cls}
        aria-label={text}
        style={{
          fontFamily,
          color: textColor,
          ...(stroke ? { WebkitTextStrokeColor: strokeColor } : null),
        }}
      >
        {/* aria-label above carries the accessible name; the per-character
            spans still concatenate to the full string for crawlers. */}
        <span className="tp-chars" aria-hidden="true">
          {chars.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                spansRef.current[i] = el;
              }}
              data-char={char}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </span>
      </Tag>
    </div>
  );
};

export default TextPressure;
