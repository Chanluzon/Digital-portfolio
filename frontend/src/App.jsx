import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useGSAP(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.classList && (target.classList.contains('heading-display') || target.classList.contains('hero-word'))) {
        gsap.to(target, { scale: 1.05, y: -2, textShadow: '0px 0px 20px rgba(168, 85, 247, 0.7)', duration: 0.3, ease: 'power2.out' });
      } else if (target.tagName && target.tagName.toLowerCase() === 'p') {
        gsap.to(target, { x: 5, color: 'var(--text-primary)', duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.classList && (target.classList.contains('heading-display') || target.classList.contains('hero-word'))) {
        gsap.to(target, { scale: 1, y: 0, textShadow: '0px 0px 0px rgba(168, 85, 247, 0)', duration: 0.5, ease: 'power2.out' });
      } else if (target.tagName && target.tagName.toLowerCase() === 'p') {
        gsap.to(target, { x: 0, color: 'var(--text-secondary)', duration: 0.5, ease: 'power2.out' });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    }
  });

  return (
    <>
      <Navbar />
      <div className="animate-fade-in">
        <main className="glass-panel" style={{ 
        width: '100%', 
        minHeight: '100vh',
        padding: '0 5%',
        borderRadius: 0, 
        border: 'none',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
