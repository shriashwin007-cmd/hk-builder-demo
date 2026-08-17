'use client';

import { useId, useMemo, useState } from 'react';
import { calculateEmi, formatInr } from '@/lib/emi';
import Reveal from '@/components/motion/Reveal';

export default function EmiCalculator() {
  const id = useId();
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, total, interest } = useMemo(
    () => calculateEmi({ principal, annualRatePct: rate, years }),
    [principal, rate, years]
  );

  return (
    <section id="emi" className="emi">
      <Reveal className="section-head">
        <div>
          <span className="tag mono">Plan Your Purchase</span>
          <h2>Home loan EMI calculator.</h2>
        </div>
        <p>Estimate your monthly instalment. Indicative only — final terms are set by your bank.</p>
      </Reveal>

      <Reveal className="emi-grid">
        <div className="emi-controls">
          <label htmlFor={`${id}-p`}>
            <span>Loan amount</span>
            <output>{formatInr(principal)}</output>
          </label>
          <input
            id={`${id}-p`}
            type="range"
            min={500000}
            max={30000000}
            step={100000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />

          <label htmlFor={`${id}-r`}>
            <span>Interest rate</span>
            <output>{rate.toFixed(2)}% p.a.</output>
          </label>
          <input
            id={`${id}-r`}
            type="range"
            min={5}
            max={15}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />

          <label htmlFor={`${id}-y`}>
            <span>Tenure</span>
            <output>{years} years</output>
          </label>
          <input
            id={`${id}-y`}
            type="range"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>

        <div className="emi-result" aria-live="polite">
          <span className="mono emi-result__label">Monthly EMI</span>
          <strong className="emi-result__value">{formatInr(emi)}</strong>
          <dl className="emi-result__breakdown">
            <div>
              <dt>Principal</dt>
              <dd>{formatInr(principal)}</dd>
            </div>
            <div>
              <dt>Total interest</dt>
              <dd>{formatInr(interest)}</dd>
            </div>
            <div>
              <dt>Total payable</dt>
              <dd>{formatInr(total)}</dd>
            </div>
          </dl>
          <a className="btn btn-gold" href="/contact?intent=loan">
            Talk to our loan desk →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
