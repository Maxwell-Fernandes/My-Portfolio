import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import StarsBackground from './components/StarsBackground';
import CustomCursor from './components/CustomCursor';
import SocialLinks from './components/SocialLinks';
import LoadingScreen from './components/LoadingScreen';
import Skills from './components/Skills';
import Terminal from './components/Terminal';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Simulate loading time
    const timeoutId = setTimeout(() => setIsLoading(false), 2000);

    // Cleanup function to prevent memory leak
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <StarsBackground />
      <SocialLinks />
      <Terminal />

      <AnimatePresence mode='wait'>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
