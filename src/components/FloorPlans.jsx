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
        <p>East and north-facing units across First, Second and Third floors — each measured down to the square foot.</p>
      </div>

      <div className="reveal" ref={bodyRef}>
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

        <div className="plan-panel active">
          <div>
            <table className="plan-table">
              <thead>
                <tr>
                  <th>Flat</th>
                  <th>Plinth</th>
                  <th>Flat Area</th>
                  <th>UDS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{plan.flat}</td>
                  <td>{plan.plinth}</td>
                  <td>{plan.area}</td>
                  <td>{plan.uds}</td>
                </tr>
              </tbody>
            </table>
            <p className="plan-facing">{plan.facing}</p>
          </div>
          <FloorPlanSketch layoutKey={plan.layout} />
        </div>
      </div>
    </section>
  );
}
