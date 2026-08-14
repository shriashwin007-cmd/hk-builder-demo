import { useEffect, useRef } from 'react';
import CountUp from './CountUp';
import TextPressure from './TextPressure';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playbackRate = 0.5;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);

  return (
    <header className="hero">
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/dxvui0xkz/video/upload/v1786643789/backround_video_etoohg.mp4"
          type="video/mp4"
        />
      </video>
      <div className="hero-video-overlay"></div>
      <div className="hero-copy">
        <span className="hero-eyebrow mono">CMDA Approved · Nolambur, Chennai</span>
        <div className="hero-pressure">
          <TextPressure
            text="HK Builder"
            fontFamily="Fraunces"
            fontUrl="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap"
            flex={true}
            alpha={false}
            stroke={false}
            width={false}
            weight={true}
            italic={false}
            textColor="#F6F2E7"
            minFontSize={44}
          />
        </div>
        <p className="hero-tagline">
          Elegant &amp; premium, <em>comfort</em> meets class.
        </p>
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
            <div className="num">
              <CountUp to={12} duration={2} />K L
            </div>
            <div className="lbl mono">Underground Water Tank</div>
          </div>
          <div>
            <div className="num">
              <CountUp to={6} duration={1.4} />
            </div>
            <div className="lbl mono">3BHK Configurations</div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <div className="line"></div>
        <span className="mono">Scroll</span>
      </div>
    </header>
  );
}
