import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import profileImg from '../assets/un3.png';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef();
  const headline = "Hi, I'm Christ\u00A0Amron\u00A0A.\u00A0Luzon.";
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

    // Idle float animations (removed y so it doesn't fight ScrollTrigger!)
    gsap.to('.hero-orb-1', { x: "+=30", duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.hero-orb-2', { x: "-=40", duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

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
      minHeight: '95vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden' // Keeps parallax inside
    }}>
      {/* Decorative Blur Orbs with class for parallax (optimized for scroll performance) */}
      <div className="hero-orb-1" style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '700px', height: '700px',
        background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 65%)', opacity: 0.4, zIndex: -1, pointerEvents: 'none', willChange: 'transform'
      }}></div>
      <div className="hero-orb-2" style={{
        position: 'absolute', bottom: '-10%', right: '-10%', width: '900px', height: '900px',
        background: 'radial-gradient(circle at center, var(--accent-light) 0%, transparent 65%)', opacity: 0.25, zIndex: -1, pointerEvents: 'none', willChange: 'transform'
      }}></div>

      <div style={{
        width: '100%', flex: 1, padding: 'clamp(40px, 8vw, 90px) clamp(20px, 5vw, 80px) clamp(20px, 4vw, 40px)', position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', gap: 'clamp(10px, 3vw, 60px)',
        boxSizing: 'border-box'
      }}>

        {/* Left Side: Text Content */}
        <div style={{ flex: '1 1 55%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', minWidth: 0, marginTop: '2vh' }}>
          <h2 className="hero-element" style={{ color: 'var(--accent-light)', fontSize: 'clamp(1rem, 2vw, 1.8rem)', marginBottom: 'clamp(10px, 2vw, 20px)', letterSpacing: 'clamp(2px, 0.5vw, 4px)', textTransform: 'uppercase', fontWeight: 700 }}>
            Welcome
          </h2>

          {/* Animated Word Staggering Headline */}
          <h1 
            className="heading-display text-gradient" 
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 5.5rem)', 
              marginBottom: 'clamp(10px, 2vw, 25px)', 
              margin: '0', 
              lineHeight: 1.1,
              position: 'relative',
              zIndex: 1,
              transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.zIndex = 50; e.currentTarget.style.transform = 'scale(1.03) translateX(15px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.zIndex = 1; e.currentTarget.style.transform = 'scale(1) translateX(0)'; }}
          >
            {words.map((word, i) => (
              <span key={i} className="hero-word-wrapper" style={{ display: 'inline-block', overflow: 'hidden', paddingInlineEnd: 'clamp(5px, 1vw, 20px)' }}>
                <span className="hero-word text-gradient" style={{ display: 'inline-block', paddingBottom: '10px' }}>{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-element" style={{ fontSize: 'clamp(0.8rem, 1.1vw, 1.1rem)', color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.7, maxWidth: '650px', margin: 'clamp(10px, 2vw, 20px) 0 clamp(15px, 3vw, 35px)' }}>
            I’m a passionate frontend-focused developer crafting elegant, high-performance web applications with immersive, visually refined interfaces and smooth, engaging interactions. Let’s create something extraordinary.
          </p>

          <div className="hero-element" style={{ display: 'flex', gap: 'clamp(10px, 2vw, 25px)', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <a href="#projects" style={{ textDecoration: 'none' }}>
              <button className="btn-primary"
                onMouseMove={enableMagnetic}
                onMouseLeave={resetMagnetic}
                style={{ padding: 'clamp(8px, 1.2vw, 14px) clamp(16px, 2vw, 32px)', fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>
                View My Work
              </button>
            </a>
            <a href="#contact" style={{ textDecoration: 'none' }}>
              <button
                onMouseMove={enableMagnetic}
                onMouseLeave={resetMagnetic}
                style={{
                  padding: 'clamp(8px, 1.2vw, 14px) clamp(16px, 2vw, 32px)', fontSize: 'clamp(0.8rem, 1vw, 1rem)', background: 'rgba(255, 255, 255, 0.03)', cursor: 'pointer', color: 'var(--text-primary)',
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
        <div className="hero-element" style={{ flex: '0 0 45%', display: 'flex', justifyContent: 'flex-end', position: 'relative', alignSelf: 'flex-end', minWidth: 0, zIndex: 5 }}>
          {/* Subtle glow directly behind the image (optimized) */}
          <div style={{
            position: 'absolute', top: '0', right: '-10%', width: '120%', height: '120%',
            background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)', opacity: 0.25, zIndex: -1, pointerEvents: 'none', willChange: 'transform'
          }}></div>

          <div style={{ position: 'absolute', bottom: 'clamp(-30px, -4vw, -60px)', right: '-15%', pointerEvents: 'none', display: 'flex', justifyContent: 'flex-end', zIndex: 0 }}>
            <img
              src={profileImg}
              alt="Christ Amron"
              style={{
                height: '110vh',
                maxWidth: 'none',
                objectFit: 'contain',
                filter: 'drop-shadow(-20px 20px 50px rgba(168, 85, 247, 0.3))',
                transform: 'perspective(1200px) rotateY(-8deg)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'auto'
              }}
              onMouseOver={(e) => e.target.style.transform = 'perspective(1200px) rotateY(0deg) scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'perspective(1200px) rotateY(-8deg) scale(1)'}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
