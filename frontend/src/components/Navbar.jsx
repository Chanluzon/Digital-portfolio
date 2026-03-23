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
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'fixed', top: scrolled ? '20px' : '30px', left: 0, zIndex: 100, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <header
        className="glass-panel"
        style={{
          width: scrolled ? '85%' : '90%',
          maxWidth: '1200px',
          padding: '12px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: '100px',
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          border: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.2)' : 'none',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none'
        }}
      >
        <div
          className="heading-display text-gradient"
          style={{ 
            fontSize: '1.4rem', 
            cursor: 'pointer', 
            letterSpacing: '-0.5px',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-block'
          }}
          onClick={() => window.scrollTo(0, 0)}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.letterSpacing = '0px'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.letterSpacing = '-0.5px'; }}
        >
          Christ Amron A. Luzon
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <nav style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  padding: '10px 18px',
                  borderRadius: '100px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseOver={(e) => { e.target.style.background = 'var(--glass-hover)'; e.target.style.transform = 'scale(1.05)'; e.target.style.color = 'var(--accent-light)'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.transform = 'scale(1)'; e.target.style.color = 'var(--text-primary)'; }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Vertical Separator */}
          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>

          <button
            onClick={toggleTheme}
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))', border: 'none', color: '#fff',
              padding: '10px 20px', borderRadius: '100px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem',
              boxShadow: '0 4px 15px rgba(107, 33, 168, 0.3)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.5)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(107, 33, 168, 0.3)'; }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
