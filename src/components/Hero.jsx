import { useEffect, useRef } from 'react';
import SplitText from './SplitText';
import CountUp from './CountUp';

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
        <h1>
          <SplitText
            tag="span"
            className="hero-line outline-text"
            text="Elegant & premium, "
            splitType="words"
            delay={40}
            duration={0.9}
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
          />
          <span className="hero-accent-line">
            <em>comfort</em> meets class.
          </span>
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
