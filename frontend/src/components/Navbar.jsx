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
          width: scrolled ? 'clamp(90%, 95vw, 1200px)' : 'clamp(95%, 98vw, 1200px)',
          maxWidth: '1200px',
          padding: 'clamp(8px, 1.5vw, 12px) clamp(10px, 3vw, 30px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none', // Hides scrollbar on Firefox for ultra-narrow screens
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
            fontSize: 'clamp(0.8rem, 1.5vw, 1.4rem)', 
            cursor: 'pointer', 
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-block'
          }}
          onClick={() => window.scrollTo(0, 0)}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.letterSpacing = '0px'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.letterSpacing = '-0.5px'; }}
        >
          Christ Amron A. Luzon
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1.5vw, 1.5rem)', flexWrap: 'nowrap' }}>
          <nav style={{ display: 'flex', gap: 'clamp(0rem, 0.3vw, 0.2rem)', alignItems: 'center', flexWrap: 'nowrap' }}>
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.65rem, 1.1vw, 0.95rem)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  padding: 'clamp(5px, 1vw, 10px) clamp(6px, 1.2vw, 18px)',
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
          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', flexShrink: 0 }}></div>

          <button
            onClick={toggleTheme}
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))', border: 'none', color: '#fff',
              padding: 'clamp(6px, 1vw, 10px) clamp(10px, 1.5vw, 20px)', borderRadius: '100px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1vw, 8px)', fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
              whiteSpace: 'nowrap', flexShrink: 0,
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
