import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Services from './components/Services';
import Project from './components/Project';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [ready, setReady] = useState(false);

  const handlePreloadComplete = useCallback(() => {
    setReady(true);
  }, []);

    return (
    <main className="w-full overflow-x-clip">
      <Hero onPreloadComplete={handlePreloadComplete} />

      <div
        className={`transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar />
        <About />
        <Services />
        <Project />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;
