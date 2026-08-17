import ScrollFrames from './ScrollFrames';
import Reveal from './motion/Reveal';

export default function Project() {
  return (
    <>
      <section id="project" className="project">
        <Reveal className="section-head">
          <div>
            <span className="tag mono">Flagship Project</span>
            <h2>SP Galaxy, Nolambur</h2>
          </div>
          <p>
            A premium 3BHK residence built for long-term comfort — from the structural frame down to the tap
            fittings.
          </p>
        </Reveal>
      </section>
      <ScrollFrames />
    </>
  );
}
