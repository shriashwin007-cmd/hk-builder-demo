import Mascot3D from './Mascot3D';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-copy">
        <span className="hero-eyebrow mono">CMDA Approved · Nolambur, Chennai</span>
        <h1>
          Elegant &amp; premium, <em>comfort</em> meets class.
        </h1>
        <p className="lede">
          HK Builder designs, constructs, paints and finishes — full-stack, under one roof. Meet SP Galaxy, our
          flagship premium 3BHK residence.
        </p>
        <div className="hero-cta">
          <a href="#project" className="btn btn-gold">
            Explore SP Galaxy →
          </a>
          <a href="#contact" className="btn btn-ghost">
            Book a Site Visit
          </a>
        </div>
        <div className="hero-stats">
          <div>
            <div className="num">III</div>
            <div className="lbl mono">Seismic Zone Rated</div>
          </div>
          <div>
            <div className="num">12K L</div>
            <div className="lbl mono">Underground Water Tank</div>
          </div>
          <div>
            <div className="num">6</div>
            <div className="lbl mono">3BHK Configurations</div>
          </div>
        </div>
      </div>
      <Mascot3D />
      <div className="scroll-cue">
        <div className="line"></div>
        <span className="mono">Scroll</span>
      </div>
    </header>
  );
}
