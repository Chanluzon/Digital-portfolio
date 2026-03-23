import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      padding: '40px 5%',
      textAlign: 'center',
      borderTop: '1px solid var(--glass-border)',
      marginTop: '60px',
      color: 'var(--text-secondary)'
    }}>
      <div className="heading-display" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
        Let's build something amazing together.
      </div>
      <p style={{ fontSize: '0.9rem' }}>
        &copy; {currentYear} Christ Amron A. Luzon. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
