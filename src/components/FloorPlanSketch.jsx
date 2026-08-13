import { layouts } from '../data/content';

export default function FloorPlanSketch({ layoutKey }) {
  const l = layouts[layoutKey];
  const labels =
    layoutKey === 'A'
      ? [
          ['HALL', l.hall],
          ['BEDROOM', l.bed1],
          ['BEDROOM', l.bed2],
          ['KITCHEN', l.kitchen],
          ['BEDROOM', l.bed3],
        ]
      : [
          ['HALL', l.hall],
          ['DINING', l.dining],
          ['BEDROOM', l.bed1],
          ['BEDROOM', l.bed2],
          ['BEDROOM', l.bed3],
        ];

  return (
    <div className="plan-sketch">
      <svg viewBox="0 0 260 300">
        <rect x="10" y="10" width="240" height="280" fill="none" stroke="#0F2E1F" strokeWidth="1.4" />
        {l.lines.map((pts, i) => (
          <line key={i} x1={pts[0]} y1={pts[1]} x2={pts[2]} y2={pts[3]} stroke="#7C9082" />
        ))}
        {labels.map(([text, pos], i) => (
          <text key={i} x={pos[0]} y={pos[1]} fontFamily="JetBrains Mono" fontSize="9" fill="#7C9082" textAnchor="middle">
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
}
