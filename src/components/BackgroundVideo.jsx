import { useCallback, useEffect, useRef } from 'react';

/**
 * Decorative autoplaying background video.
 *
 * React assigns `muted` as a DOM property, not an attribute, so the rendered
 * markup has no `muted=""`. Safari evaluates its autoplay policy against the
 * attribute while parsing — before any effect runs — so it treats the video as
 * unmuted, blocks autoplay, and paints its own play/pause control. Setting the
 * attribute from a ref callback (which fires before effects and before paint)
 * is what actually makes autoplay stick.
 */
export default function BackgroundVideo({ src, className = '', playbackRate = 1 }) {
  const ref = useRef(null);

  const setRef = useCallback((el) => {
    ref.current = el;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.setAttribute('muted', '');
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.playbackRate = playbackRate;

    const tryPlay = () => {
      const p = el.play();
      if (p?.catch) p.catch(() => {});
    };

    tryPlay();
    el.addEventListener('loadeddata', tryPlay);
    el.addEventListener('canplay', tryPlay);

    // The readiness events can fire before these listeners attach, which would
    // leave the video parked at frame 0 forever. Poll briefly as a backstop and
    // stop as soon as it is actually rolling.
    let attempts = 0;
    const retry = setInterval(() => {
      attempts += 1;
      if (!el.paused || attempts > 20) {
        clearInterval(retry);
        return;
      }
      tryPlay();
    }, 250);

    // Last resort: some browsers hold playback until the page is interacted with.
    const onInteract = () => tryPlay();
    document.addEventListener('pointerdown', onInteract, { once: true });

    return () => {
      clearInterval(retry);
      el.removeEventListener('loadeddata', tryPlay);
      el.removeEventListener('canplay', tryPlay);
      document.removeEventListener('pointerdown', onInteract);
    };
  }, [playbackRate, src]);

  return (
    <video
      ref={setRef}
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
