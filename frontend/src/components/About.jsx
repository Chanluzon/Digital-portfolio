import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setLoading(false);
      });
  }, []);

  useGSAP(() => {
    gsap.to('.about-bg', {
      scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: 200, ease: 'none'
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%'
      }
    });

    tl.fromTo('.about-text',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );

    if (!loading && skills.length > 0) {
      tl.fromTo('.skill-badge',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }
  }, { scope: container, dependencies: [loading, skills] });

  return (
    <section id="about" ref={container} style={{ padding: '100px 0', minHeight: '80vh', position: 'relative', zIndex: 10 }}>
      {/* Background glow */}
      <div className="about-bg" style={{
        position: 'absolute', bottom: '10%', left: '-10%', width: '500px', height: '500px',
        background: 'var(--accent-light)', filter: 'blur(200px)', opacity: 0.1, borderRadius: '50%', zIndex: -1
      }}></div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>

        {/* Bio Section */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="heading-display text-gradient about-text" style={{ fontSize: '3rem', marginBottom: '30px' }}>About Me</h2>
          <div className="about-text" style={{ height: '4px', width: '60px', background: 'var(--accent)', marginBottom: '30px', borderRadius: '2px' }}></div>
          <p className="about-text" style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '20px' }}>
            I’m a passionate software engineer based in Southern Leyte, with a strong focus on crafting deeply interactive, premium web experiences—primarily on the frontend. I specialize in building visually refined interfaces, from pixel-perfect glassmorphism designs using React and Tailwind to smooth, engaging animations that elevate user experience.
          </p>
          <p className="about-text" style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            While I have experience working across the full stack with technologies like Node.js and Firebase, my core drive lies in creating frontend experiences that are both aesthetically compelling and highly functional. Whether developing AI-powered applications like SpeakForge or designing seamless UI interactions, I aim to build technology that feels as good as it looks.
          </p>
        </div>

        {/* Skills Section */}
        <div id="skills" style={{ flex: '1 1 450px', scrollMarginTop: '100px' }} className="about-text">
          <div className="glass-panel" style={{ padding: '40px', background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="heading-display" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '35px' }}>
              My Arsenal
            </h3>

            {loading ? (
              <div style={{ color: 'var(--accent-light)', fontSize: '1.1rem' }}>Loading Skills...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {skills.map(skillGroup => (
                  <div key={skillGroup.category}>
                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {skillGroup.category}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {skillGroup.items.map(item => (
                        <span key={item} className="skill-badge" style={{
                          padding: '10px 18px',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          border: '1px solid rgba(255,255,255,0.08)',
                          transition: 'all 0.3s ease',
                          cursor: 'default'
                        }}
                          onMouseOver={(e) => {
                            e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                            e.target.style.borderColor = 'var(--accent-light)';
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.05)';
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.transform = 'translateY(0)';
                          }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
