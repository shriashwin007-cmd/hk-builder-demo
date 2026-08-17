'use client';

import { useState } from 'react';
import FloorPlanSketch from '@/components/FloorPlanSketch';
import Reveal from '@/components/motion/Reveal';

export default function FloorPlanTabs({ plans = [] }) {
  const [active, setActive] = useState(plans[0]?.id);
  if (!plans.length) return null;
  const plan = plans.find((p) => p.id === active) ?? plans[0];

  return (
    <section id="floor-plans" className="page-section plans-static">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Floor Plans</span>
          <h2>{plans.length} premium layouts.</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="Floor plans">
          {plans.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === plan.id}
              className={`tab-btn${p.id === plan.id ? ' active' : ''}`}
              onClick={() => setActive(p.id)}
            >
              {p.id}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="plans-body">
        <div className="plan-info">
          <p className="plan-desc">Configurations built around different lifestyles.</p>
          <div className="plan-divider" />
          <div className="plan-fact-id mono">
            {plan.id} · {plan.floor}
          </div>
          <div className="plan-fact-area">{plan.plinth}</div>
          <ul className="plan-fact-list">
            <li>{plan.bedrooms} Bedrooms</li>
            <li>{plan.toilets} Toilets</li>
            <li>{plan.facing}</li>
            <li>Saleable {plan.saleableArea} · UDS {plan.uds}</li>
          </ul>
        </div>
        <div className="plan-sketch-wrap">
          <FloorPlanSketch layoutKey={plan.layout} />
        </div>
      </Reveal>
    </section>
  );
}
