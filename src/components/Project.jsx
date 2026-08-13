import { useReveal } from '../hooks/useReveal';
import ScrollFrames from './ScrollFrames';

export default function Project() {
  const headRef = useReveal();

  return (
    <>
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
      </section>
      <ScrollFrames />
    </>
  );
}
