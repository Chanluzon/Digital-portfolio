import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef();
  const headline = "Crafting Digital Experiences That Inspire.";
  const words = headline.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline({ 
      delay: 0.2,
      onComplete: () => {
        gsap.set('.hero-word-wrapper', { overflow: 'visible' });
      }
    });

    // Staggered word reveal from bottom
    tl.fromTo('.hero-word', 
      { y: 120, opacity: 0, rotationZ: 5 },
      { y: 0, opacity: 1, rotationZ: 0, duration: 1.2, stagger: 0.08, ease: 'power4.out' }
    );

    // Stagger other elements
    tl.fromTo('.hero-element', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      "-=0.8" // Overlap with words
    );
    
    // Parallax background orbs on scroll
    gsap.to('.hero-orb-1', {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      },
      y: 300,
      ease: 'none'
    });

    gsap.to('.hero-orb-2', {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      },
      y: -250,
      ease: 'none'
    });

  }, { scope: container });

  // Magnetic button effect handler
  const enableMagnetic = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
  };

  const resetMagnetic = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <section id="home" ref={container} style={{
      minHeight: '100vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden' // Keeps parallax inside
    }}>
      {/* Decorative Blur Orbs with class for parallax */}
      <div className="hero-orb-1" style={{
        position: 'absolute', top: '5%', left: '0%', width: '400px', height: '400px',
        background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.5, borderRadius: '50%', zIndex: -1
      }}></div>
      <div className="hero-orb-2" style={{
        position: 'absolute', bottom: '5%', right: '0%', width: '500px', height: '500px',
        background: 'var(--accent-light)', filter: 'blur(180px)', opacity: 0.3, borderRadius: '50%', zIndex: -1
      }}></div>

      <div style={{
        width: '100%', flex: 1, padding: '120px 5% 60px', textAlign: 'center', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }}>
        <h2 className="hero-element" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '20px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
          Welcome to my digital space
        </h2>
        
        {/* Animated Word Staggering Headline */}
        <h1 className="heading-display text-gradient" style={{ fontSize: '4.5rem', marginBottom: '35px', margin: '0 0 35px', lineHeight: 1.1 }}>
          {words.map((word, i) => (
            <span key={i} className="hero-word-wrapper" style={{ display: 'inline-block', overflow: 'hidden', paddingInlineEnd: '15px' }}>
              <span className="hero-word text-gradient" style={{ display: 'inline-block', paddingBottom: '10px' }}>{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-element" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '50px', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 50px' }}>
          I'm a passionate full-stack developer dedicated to building elegant, high-performance web applications with striking user interfaces. Let's create something extraordinary.
        </p>
        
        <div className="hero-element" style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
          <a href="#projects" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" 
              onMouseMove={enableMagnetic} 
              onMouseLeave={resetMagnetic}
              style={{ padding: '16px 45px', fontSize: '1.15rem' }}>
              View My Work
            </button>
          </a>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button 
              onMouseMove={enableMagnetic} 
              onMouseLeave={resetMagnetic}
              style={{ 
              padding: '15px 45px', fontSize: '1.15rem', background: 'rgba(255, 255, 255, 0.03)', cursor: 'pointer', color: 'var(--text-primary)', 
              fontWeight: 600, fontFamily: 'var(--font-sans)', border: '1px solid var(--glass-border)',
              borderRadius: '8px', transition: 'background-color 0.3s ease, border-color 0.3s ease'
              }}
            onMouseOver={(e) => Object.assign(e.target.style, { background: 'var(--glass-hover)', borderColor: 'rgba(255,255,255,0.3)' })}
            onMouseOut={(e) => Object.assign(e.target.style, { background: 'rgba(255,255,255,0.03)', borderColor: 'var(--glass-border)' })}
            >
              Let's Talk
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
