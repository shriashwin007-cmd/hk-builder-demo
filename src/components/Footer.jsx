import Reveal from './motion/Reveal';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-top">
        <Reveal className="footer-cta">
          <h2 className="outline-text">Let&apos;s build your next address.</h2>
          <p>Site visits open daily at SP Galaxy, Nolambur. Talk to our team about unit availability and loan partners.</p>
          <a href="tel:9940669066" className="btn btn-gold">
            Call 99406 69066 →
          </a>
        </Reveal>
        <Reveal className="footer-col">
          <h4>Project Office</h4>
          <p>
            No.8, Arcot Road, Shop 4&amp;5,
            <br />
            Visalatchi Street, Thandavamurthy Nagar,
            <br />
            Valasaravakkam, Chennai – 600087
          </p>
          <a href="mailto:hk7builder@gmail.com">hk7builder@gmail.com</a>
        </Reveal>
        <Reveal className="footer-col">
          <h4>Contact</h4>
          <a href="tel:9940669066">99406 69066</a>
          <a href="tel:9790712222">97907 12222</a>
        </Reveal>
      </div>
      <div className="footer-bottom">
        <span>© HK Builder — Crafting Communities</span>
        <span className="mono">Demo build · Not final client site</span>
      </div>
    </footer>
  );
}
