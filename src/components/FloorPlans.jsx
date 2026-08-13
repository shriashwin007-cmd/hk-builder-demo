import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { floorPlans } from '../data/content';
import FloorPlanSketch from './FloorPlanSketch';
import SplitText from './SplitText';

export default function FloorPlans() {
  const [active, setActive] = useState(floorPlans[0].id);
  const headRef = useReveal();
  const bodyRef = useReveal();
  const videoRef = useRef(null);
  const plan = floorPlans.find((p) => p.id === active);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return (
    <section id="plans" className="plans">
      <video
        ref={videoRef}
        className="plans-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/dxvui0xkz/video/upload/v1786646852/second_backround_video_dtlciv.mp4"
          type="video/mp4"
        />
      </video>
      <div className="plans-video-overlay"></div>
      <div className="section-head reveal" ref={headRef}>
        <div>
          <span className="tag mono">Floor Plans</span>
          <SplitText
            tag="h2"
            text="Six premium 3BHK layouts."
            splitType="words"
            delay={35}
            duration={0.8}
            from={{ opacity: 0, y: 26 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
        <div className="tabs">
          {floorPlans.map((p) => (
            <button
              key={p.id}
              className={`tab-btn${p.id === active ? ' active' : ''}`}
              onClick={() => setActive(p.id)}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>

      <div className="plans-body reveal" ref={bodyRef}>
        <div className="plan-info">
          <p className="plan-desc">
            Six thoughtfully designed configurations built around different lifestyles.
          </p>
          <div className="plan-divider"></div>
          <div className="plan-fact-id mono">{plan.id}</div>
          <div className="plan-fact-area">{plan.plinth}</div>
          <ul className="plan-fact-list">
            <li>{plan.bedrooms} Bedrooms</li>
            <li>{plan.toilets} Toilets</li>
            <li>{plan.facingShort}</li>
          </ul>
        </div>
        <div className="plan-sketch-wrap">
          <FloorPlanSketch layoutKey={plan.layout} />
        </div>
      </div>
    </section>
  );
}
