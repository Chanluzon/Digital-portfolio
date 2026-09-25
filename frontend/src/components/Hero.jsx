import React, { useRef } from 'react';
import gsap from 'gsap';
import profileImg from '../assets/un3.png';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.fromTo('.hero-headline .reveal-text > span',
      { y: '110%', opacity: 0, rotationX: -15 },
      { y: '0%', opacity: 1, rotationX: 0, stagger: 0.1, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    );

    tl.fromTo('.hero-role',
      { y: 20, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out' },
      '-=0.9'
    );


    tl.fromTo('.hero-desc',
      { y: 30, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
      '-=1'
    );

    tl.fromTo('.hero-btns > *',
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 1, ease: 'back.out(1.7)' },
      '-=0.8'
    );

    tl.fromTo('.hero-image-container', {
      scale: 0.9,
      opacity: 0,
      rotationY: 15,
      filter: 'blur(20px)'
    }, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      filter: 'blur(0px)',
      duration: 1.8,
      ease: 'expo.out'
    }, '-=1.2');

    gsap.to('.hero-orb-1', {
      y: 120, x: 80, rotation: 15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.hero-orb-2', {
      y: -120, x: -80, rotation: -15, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

  }, { scope: container });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 40;
    const yPos = (clientY / window.innerHeight - 0.5) * 40;

    gsap.to('.hero-image-container', {
      rotationY: xPos / 2,
      rotationX: -yPos / 2,
      transformPerspective: 1000,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.to('.hero-image', {
      x: xPos,
      y: yPos,
      duration: 1.5,
      ease: 'power2.out'
    });
  };

  return (
    <section id="home" ref={container} onMouseMove={handleMouseMove} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '70px 0 25px'
    }}>
      <div className="hero-orb-1" style={{
        position: 'absolute', top: '5%', left: '-10%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        opacity: 0.15, filter: 'blur(80px)', zIndex: -1
      }} />
      <div className="hero-orb-2" style={{
        position: 'absolute', bottom: '5%', right: '-10%', width: '700px', height: '700px',
        background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)',
        opacity: 0.1, filter: 'blur(100px)', zIndex: -1
      }} />

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}>
        <div className="hero-content" style={{ zIndex: 2, order: 2, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="hero-headline heading-display" style={{ fontSize: 'clamp(1.65rem, 7.5vw, 4.25rem)', marginBottom: '8px', letterSpacing: '0', whiteSpace: 'nowrap' }}>
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: 2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Christ</span>
            </div>{' '}
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: -2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Amron</span>
            </div>{' '}
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: 2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >A.</span>
            </div>{' '}
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: -2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Luzon</span>
            </div>

          </h1>

          <div className="hero-role" style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            cursor: 'default',
            transition: 'var(--transition-smooth)'
          }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, letterSpacing: '0.12em', duration: 0.4, ease: 'back.out(1.7)' })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, letterSpacing: '0.08em', duration: 0.4, ease: 'power2.out' })}
          >
            Full Stack Developer
          </div>

          <p className="hero-desc" style={{
            fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            lineHeight: 1.6,
            marginBottom: '20px',
            fontWeight: 400
          }}>
            I'm a full-stack developer building modern web applications through clean code, thoughtful design, and reliable functionality. I work across both frontend and backend, creating responsive interfaces, APIs, databases, and complete web experiences.
          </p>


          <div className="hero-btns" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#projects" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">
                Explore Work
                <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s ease' }}>→</span>
              </button>
            </a>
            <a href="/cv.pdf" download="Christ Amron Luzon - RESUME SOFTDEV.pdf" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">Download CV</button>
            </a>
            <a href="#contact" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">Let's Connect</button>
            </a>
          </div>
        </div>

        <div className="hero-image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', zIndex: 1, order: 1, width: '100%', maxWidth: '260px', transformStyle: 'preserve-3d' }}>
          <div className="glass-panel" style={{
            width: 'clamp(180px, 48vw, 260px)',
            height: 'clamp(180px, 48vw, 260px)',
            aspectRatio: '1',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            transform: 'translateZ(20px)'
          }}>
            <img
              src={profileImg}
              className="hero-image"
              alt="Christ Amron A. Luzon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                scale: '1.05',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

