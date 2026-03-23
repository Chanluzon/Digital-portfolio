import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import profileImg from '../assets/un3.png';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef();
  const headline = "Hi, I'm Christ Amron.";
  const words = headline.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        gsap.set('.hero-word-wrapper', { overflow: 'visible' });
      }
    });

    // Advanced staggered word reveal with blur decode
    tl.fromTo('.hero-word',
      { y: 150, opacity: 0, rotationZ: 10, filter: 'blur(20px)' },
      { y: 0, opacity: 1, rotationZ: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.06, ease: 'power4.out' }
    );

    // Advanced stagger other elements
    tl.fromTo('.hero-element',
      { y: 50, opacity: 0, filter: 'blur(10px)', scale: 0.95 },
      { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.2, stagger: 0.15, ease: 'back.out(1.4)' },
      "-=1.1" // Deep overlap
    );

    // Idle float animations
    gsap.to('.hero-orb-1', { y: "-=50", x: "+=30", duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.hero-orb-2', { y: "+=60", x: "-=40", duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Parallax background orbs on scroll
    gsap.to('.hero-orb-1', {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      },
      y: 400, scale: 1.2,
      ease: 'power1.out'
    });

    gsap.to('.hero-orb-2', {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      },
      y: -350, scale: 0.8,
      ease: 'power1.out'
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
        width: '100%', flex: 1, padding: '120px 5% 60px', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap-reverse', gap: '60px'
      }}>

        {/* Left Side: Text Content */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <h2 className="hero-element" style={{ color: 'var(--accent-light)', fontSize: '1.2rem', marginBottom: '20px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
            Welcome
          </h2>

          {/* Animated Word Staggering Headline */}
          <h1 className="heading-display text-gradient" style={{ fontSize: 'clamp(4.5rem, 8vw, 7.5rem)', marginBottom: '35px', margin: '0', lineHeight: 1.1 }}>
            {words.map((word, i) => (
              <span key={i} className="hero-word-wrapper" style={{ display: 'inline-block', overflow: 'hidden', paddingInlineEnd: '20px' }}>
                <span className="hero-word text-gradient" style={{ display: 'inline-block', paddingBottom: '10px' }}>{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-element" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '50px', lineHeight: 1.7, maxWidth: '650px', margin: '30px 0 50px' }}>
            I’m a passionate frontend-focused developer crafting elegant, high-performance web applications with immersive, visually refined interfaces and smooth, engaging interactions. Let’s create something extraordinary.
          </p>

          <div className="hero-element" style={{ display: 'flex', gap: '25px', justifyContent: 'flex-start' }}>
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

        {/* Right Side: Image Content */}
        <div className="hero-element" style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'flex-end', position: 'relative', alignSelf: 'flex-end' }}>
          {/* Subtle glow directly behind the image */}
          <div style={{
            position: 'absolute', top: '20%', right: '0', width: '100%', height: '100%',
            background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.3, borderRadius: '50%', zIndex: -1
          }}></div>

          <img
            src={profileImg}
            alt="Christ Amron"
            style={{
              width: '135%',
              maxWidth: '850px',
              marginRight: '-10%',
              marginBottom: '-60px', // Counters the padding to dock precisely to bottom edge
              objectFit: 'contain',
              objectPosition: 'bottom right',
              filter: 'drop-shadow(-20px 20px 50px rgba(168, 85, 247, 0.3))',
              transform: 'perspective(1200px) rotateY(-8deg)',
              transformOrigin: 'bottom right',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'perspective(1200px) rotateY(0deg) scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'perspective(1200px) rotateY(-8deg) scale(1)'}
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
