import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'fixed', top: scrolled ? '20px' : '40px', left: 0, zIndex: 100, transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <header
        className="glass-panel"
        style={{
          width: 'clamp(90%, 95vw, 1100px)',
          padding: scrolled ? '10px 25px' : '15px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: '100px',
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          border: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.1)' : 'none',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none'
        }}
      >
        <div
          className="heading-display text-gradient"
          style={{ 
            fontSize: 'clamp(1rem, 1.4vw, 1.5rem)', 
            cursor: 'pointer', 
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onClick={() => window.scrollTo(0, 0)}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Christ Amron A. Luzon
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2vw, 25px)' }}>
          <nav style={{ display: 'flex', gap: '5px', alignItems: 'center', display: 'flex' }}>
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.75rem, 1vw, 0.95rem)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => { e.target.style.background = 'var(--glass-hover)'; e.target.style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Vertical Separator */}
          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', flexShrink: 0 }}></div>

          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              fontSize: '1.2rem',
              flexShrink: 0
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'rotate(15deg) scale(1.1)'; e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(168, 85, 247, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'rotate(0deg) scale(1)'; e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none'; }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
