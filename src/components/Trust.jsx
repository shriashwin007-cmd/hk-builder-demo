import Stagger from './motion/Stagger';

const items = [
  <>
    <strong>CMDA</strong>&nbsp;Approved Project
  </>,
  <>
    Home Loans via <strong>HDFC Bank</strong>
  </>,
  <>
    Home Loans via <strong>SBI</strong>
  </>,
  <>
    Smart <strong>Digital Lock</strong> Security
  </>,
];

export default function Trust() {
  return (
    <section className="trust">
      <Stagger className="trust-inner" y={30} stagger={0.09}>
        {items.map((item, i) => (
          <div className="trust-item" key={i}>
            {item}
          </div>
        ))}
      </Stagger>
    </section>
  );
}
