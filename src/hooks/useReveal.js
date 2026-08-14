import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fade + rise a single element into view, driven by GSAP.
 */
export function useReveal({ y = 40, duration = 1, delay = 0, start = 'top 85%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The .reveal class hides the element by default; GSAP owns it from here.
    el.classList.add('in');

    if (reduceMotion()) return;

    const tween = gsap.fromTo(
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

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, duration, delay, start]);

  return ref;
}

/**
 * Stagger direct children of a container into view.
 */
export function useStagger({ y = 48, stagger = 0.12, duration = 0.9, start = 'top 82%', selector } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('in');

    const targets = selector ? el.querySelectorAll(selector) : el.children;
    if (!targets.length || reduceMotion()) return;

    const tween = gsap.fromTo(
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

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, stagger, duration, start, selector]);

  return ref;
}

/**
 * Scrub an element vertically as its section passes through the viewport.
 * `strength` is the total travel in px across the whole scroll range.
 */
export function useParallax({ strength = 90, trigger } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;

    const triggerEl = trigger?.current || el.parentElement || el;

    const tween = gsap.fromTo(
      el,
      { yPercent: -strength / 20 },
      {
        yPercent: strength / 20,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [strength, trigger]);

  return ref;
}
