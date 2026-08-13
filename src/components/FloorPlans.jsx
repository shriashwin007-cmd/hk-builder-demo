import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { floorPlans } from '../data/content';
import FloorPlanSketch from './FloorPlanSketch';

export default function FloorPlans() {
  const [active, setActive] = useState(floorPlans[0].id);
  const headRef = useReveal();
  const bodyRef = useReveal();
  const plan = floorPlans.find((p) => p.id === active);

  return (
    <section id="plans" className="plans">
      <div className="section-head reveal" ref={headRef}>
        <div>
          <span className="tag mono">Floor Plans</span>
          <h2>Six premium 3BHK layouts.</h2>
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
