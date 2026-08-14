import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import Services from './components/Services';
import Project from './components/Project';
import FloorPlans from './components/FloorPlans';
import Location from './components/Location';
import Trust from './components/Trust';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Services />
      <Project />
      <FloorPlans />
      <Location />
      <Trust />
      <Footer />
    </>
  );
}

export default App;
