import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  useGSAP(() => {
    gsap.to('.projects-bg', {
      scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: -200, ease: 'none'
    });
    if (!loading && projects.length > 0) {
      gsap.fromTo('.project-card',
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: container.current,
            start: 'top 85%'
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }
  }, { scope: container, dependencies: [loading, projects] });

  return (
    <section id="projects" ref={container} style={{ padding: '100px 0', minHeight: '80vh', position: 'relative', zIndex: 10 }}>
      {/* Background glow for the section */}
      <div className="projects-bg" style={{
        position: 'absolute', top: '30%', right: '-10%', width: '600px', height: '600px',
        background: 'var(--accent)', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%', zIndex: -1
      }}></div>

      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 className="heading-display text-gradient" style={{ fontSize: '3rem', marginBottom: '20px' }}>Featured Works</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          A selection of projects that showcase my ability to build intuitive, scalable, and visually compelling applications.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--accent-light)' }}>
          <div className="heading-display">Loading Projects...</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          width: '100%'
        }}>
          {projects.map((project) => (
            <div key={project.id} className="glass-panel project-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '35px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="heading-display" style={{ fontSize: '1.6rem', marginBottom: '15px', color: 'var(--text-primary)' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: 1.7, flexGrow: 1, fontSize: '1.05rem' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '35px' }}>
                  {project.techStack.map(tech => (
                    <span key={tech} style={{
                      background: 'rgba(168, 85, 247, 0.1)',
                      color: 'var(--accent-light)',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '1px solid rgba(168, 85, 247, 0.2)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ width: '100%', padding: '12px 0', fontSize: '1rem' }}>Live Demo</button>
                  </a>
                  <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
                    <button className="glass-panel" style={{
                      width: '100%', padding: '12px 0', background: 'transparent', color: 'var(--text-primary)',
                      border: '1px solid var(--glass-border)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem'
                    }}
                      onMouseOver={(e) => Object.assign(e.target.style, { background: 'var(--glass-hover)' })}
                      onMouseOut={(e) => Object.assign(e.target.style, { background: 'transparent' })}>
                      Source
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
