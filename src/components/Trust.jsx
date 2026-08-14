import { useStagger } from '../hooks/useReveal';

const items = [
  <><strong>CMDA</strong>&nbsp;Approved Project</>,
  <>Home Loans via <strong>HDFC Bank</strong></>,
  <>Home Loans via <strong>SBI</strong></>,
  <>Smart <strong>Digital Lock</strong> Security</>,
];

export default function Trust() {
  const ref = useStagger({ y: 30, stagger: 0.09 });
  return (
    <section className="trust">
      <div className="trust-inner reveal" ref={ref}>
        {items.map((item, i) => (
          <div className="trust-item" key={i}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
