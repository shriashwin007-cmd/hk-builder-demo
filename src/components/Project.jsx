import { useReveal } from '../hooks/useReveal';
import { specs } from '../data/content';

export default function Project() {
  const headRef = useReveal();
  const artRef = useReveal();

  return (
    <section id="project" className="project">
      <div className="section-head reveal" ref={headRef}>
        <div>
          <span className="tag mono">Flagship Project</span>
          <h2>SP Galaxy, Nolambur</h2>
        </div>
        <p>
          A premium 3BHK residence built for long-term comfort — from the structural frame down to the tap
          fittings.
        </p>
      </div>
      <div className="project-layout">
        <div className="building-art reveal" ref={artRef}>
          <svg viewBox="0 0 300 400" fill="none">
            <rect x="40" y="40" width="220" height="330" fill="#1f333d" stroke="#C9A227" strokeWidth="1" />
            <g stroke="#3a4e58" strokeWidth="1">
              <line x1="40" y1="90" x2="260" y2="90" />
              <line x1="40" y1="140" x2="260" y2="140" />
              <line x1="40" y1="190" x2="260" y2="190" />
              <line x1="40" y1="240" x2="260" y2="240" />
              <line x1="40" y1="290" x2="260" y2="290" />
              <line x1="40" y1="340" x2="260" y2="340" />
            </g>
            <g fill="#C9A227" opacity="0.85">
              <rect x="55" y="55" width="24" height="24" />
              <rect x="95" y="55" width="24" height="24" />
              <rect x="181" y="55" width="24" height="24" />
              <rect x="221" y="55" width="24" height="24" />
              <rect x="55" y="105" width="24" height="24" />
              <rect x="221" y="105" width="24" height="24" />
              <rect x="55" y="155" width="24" height="24" />
              <rect x="221" y="155" width="24" height="24" />
              <rect x="55" y="205" width="24" height="24" />
              <rect x="221" y="205" width="24" height="24" />
              <rect x="55" y="255" width="24" height="24" />
              <rect x="221" y="255" width="24" height="24" />
              <rect x="55" y="305" width="24" height="24" />
              <rect x="221" y="305" width="24" height="24" />
            </g>
            <rect x="125" y="320" width="50" height="50" fill="#0F2E1F" stroke="#C9A227" strokeWidth="1" />
            <text x="150" y="392" fill="#C9A227" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle" letterSpacing="1">
              SP GALAXY · @ NOLAMBUR
            </text>
          </svg>
        </div>
        <div>
          <div className="spec-list">
            {specs.map((row) => (
              <div className="spec-row" key={row.k}>
                <div className="k">{row.k}</div>
                <div className="v">{row.v}</div>
              </div>
            ))}
          </div>
          <div className="badge-row">
            <span className="badge">CMDA Approved</span>
            <span className="badge">HDFC Home Loan</span>
            <span className="badge">SBI Home Loan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
