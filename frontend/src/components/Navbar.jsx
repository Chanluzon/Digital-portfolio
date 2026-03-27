import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: 1000, 
      padding: scrolled ? '15px 0' : '30px 0',
      transition: 'var(--transition-smooth)'
    }}>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '3px',
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
        transition: 'width 0.1s ease-out',
        zIndex: 1001
      }} />

      <header
        className="glass-panel"
        style={{
          width: 'clamp(90%, 95vw, 1200px)',
          padding: scrolled ? '10px 20px' : '15px 35px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '100px',
          background: scrolled ? 'rgba(8, 8, 12, 0.7)' : 'transparent',
          borderColor: scrolled ? 'var(--glass-border)' : 'transparent',
          boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div
          className="heading-display text-gradient"
          style={{ 
            fontSize: 'clamp(1.1rem, 1.5vw, 1.6rem)', 
            cursor: 'pointer', 
            fontWeight: 800,
            letterSpacing: '-1px'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          CHRIST AMRON
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <nav style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '8px 20px',
                  borderRadius: '100px',
                  transition: 'var(--transition-smooth)',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--glass-bg)';
                  e.target.style.boxShadow = 'inset 0 0 10px rgba(255,255,255,0.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }}></div>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-smooth)',
              fontSize: '1.1rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
              e.currentTarget.style.borderColor = 'var(--accent-light)';
              e.currentTarget.style.boxShadow = '0 0 15px var(--accent-glow)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
