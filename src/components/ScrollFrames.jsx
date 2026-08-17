'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { projectCaptions } from '../data/content';


const FRAME_COUNT = 240;
const FRAME_PATH = (i) => `/frames/frame-${String(i + 1).padStart(4, '0')}.jpg`;

function drawCover(ctx, img, cw, ch) {
  const ir = img.width / img.height;
  const cr = cw / ch;
  let sx, sy, sw, sh;
  if (ir > cr) {
    sh = img.height;
    sw = sh * cr;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / cr;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function ScrollFrames() {
  const wrapRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);
  const loaderRef = useRef(null);
  const captionRefs = useRef([]);
  const imagesRef = useRef([]);
  const lastDrawnRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = imagesRef.current;
    let loadedCount = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = pinRef.current.clientWidth;
      const h = pinRef.current.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (lastDrawnRef.current >= 0) {
        const img = images[lastDrawnRef.current];
        if (img?.complete) drawCover(ctx, img, w, h);
      }
    };

    const drawFrame = (idx) => {
      let target = idx;
      while (target >= 0 && !(images[target]?.complete && images[target]?.naturalWidth)) {
        target -= 1;
      }
      if (target < 0 || target === lastDrawnRef.current) return;
      lastDrawnRef.current = target;
      drawCover(ctx, images[target], pinRef.current.clientWidth, pinRef.current.clientHeight);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount += 1;
        if (i === 0) {
          resizeCanvas();
          drawFrame(0);
          gsap.to(loaderRef.current, { autoAlpha: 0, duration: 0.5 });
        }
        if (loaderRef.current) {
          loaderRef.current.textContent = `Loading cinematic preview… ${Math.round((loadedCount / FRAME_COUNT) * 100)}%`;
        }
      };
      images.push(img);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        pin: pinRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const idx = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * (FRAME_COUNT - 1)));
          drawFrame(idx);
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    projectCaptions.forEach((_, i) => {
      const el = captionRefs.current[i];
      if (!el) return;
      tl.fromTo(
        el,
        { autoAlpha: 0, rotateX: 55, z: -140, y: 30 },
        { autoAlpha: 1, rotateX: 0, z: 0, y: 0, duration: 0.5, ease: 'power2.out' },
        i
      ).to(el, { autoAlpha: 0, rotateX: -55, z: -140, y: -30, duration: 0.5, ease: 'power2.in' }, i + 0.62);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      tl.scrollTrigger?.kill();
      tl.kill();
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, []);

  return (
    <div className="scroll-frames-wrap" ref={wrapRef}>
      <div className="scroll-frames-pin" ref={pinRef}>
        <canvas ref={canvasRef} className="scroll-frames-canvas" />
        <div className="scroll-frames-loader mono" ref={loaderRef}>
          Loading cinematic preview… 0%
        </div>
        <div className="scroll-frames-head mono">
          <span>SP Galaxy — Construction Journey</span>
          <span>Scroll to explore</span>
        </div>
        <div className="scroll-caption-track">
          {projectCaptions.map((c, i) => (
            <div className="scroll-caption" ref={(el) => (captionRefs.current[i] = el)} key={c.title}>
              <span className="cap-idx mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              {c.badges ? (
                <div className="badge-row">
                  {c.badges.map((b) => (
                    <span className="badge" key={b}>
                      {b}
                    </span>
                  ))}
                </div>
              ) : (
                <p>{c.body}</p>
              )}
            </div>
          ))}
        </div>
        <div className="scroll-progress-track">
          <div className="scroll-progress-fill" ref={progressRef} />
        </div>
      </div>
    </div>
  );
}
