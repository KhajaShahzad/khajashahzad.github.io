import React, { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Services from './components/Services';
import Project from './components/Project';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [, setReady] = useState(false);

  const handlePreloadComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <main className="relative w-full overflow-x-clip bg-[#050505]">
      <Navbar />
      <Hero onPreloadComplete={handlePreloadComplete} />
      <About />
      <Journey />
      <Services />
      <Project />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
