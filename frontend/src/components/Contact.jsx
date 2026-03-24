import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const container = useRef();

  useGSAP(() => {
    gsap.to('.contact-bg', {
      scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: 150, ease: 'none'
    });
    gsap.fromTo('.contact-info',
      { x: -80, opacity: 0, filter: 'blur(10px)' },
      {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        },
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'expo.out'
      }
    );

    gsap.fromTo('.contact-form',
      { x: 80, opacity: 0, filter: 'blur(10px)', rotationY: -15 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        },
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        rotationY: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.2,
        transformPerspective: 1200
      }
    );
  }, { scope: container });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())) {
      setStatus('invalid_email');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '63498d71-0b38-44f6-99d3-02ddf86b24ea',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: 'Digital Portfolio'
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '15px 20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    marginBottom: '20px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <section id="contact" ref={container} style={{ padding: '100px 0', minHeight: '80vh', position: 'relative', zIndex: 10 }}>
      {/* Background glow */}
      <div className="contact-bg" style={{
        position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px',
        background: 'var(--accent)', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%', zIndex: -1
      }}></div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center',
        background: 'var(--glass-bg)', padding: '60px', borderRadius: '24px', border: '1px solid var(--glass-border)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>

        <div className="contact-info" style={{ flex: '1 1 350px' }}>
          <h2 className="heading-display text-gradient" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Let's Connect</h2>
          <div style={{ height: '4px', width: '60px', background: 'var(--accent)', marginBottom: '30px', borderRadius: '2px' }}></div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '40px' }}>
            Have a project in mind, or just want to say hi? I'm always open to discussing new opportunities, creative ideas or visions to be part of.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: 'var(--accent-light)', fontSize: '1.3rem' }}>✉</span>  christamron.luzon@gmail.com
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: 'var(--accent-light)', fontSize: '1.3rem' }}>📍</span>Cebu City, Cebu 6000, Philippines.
            </div>
          </div>
        </div>

        <div className="contact-form" style={{ flex: '1 1 400px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text" name="name" placeholder="Your Name" required
              value={formData.name} onChange={handleChange} style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, { borderColor: 'var(--accent-light)', background: 'rgba(255,255,255,0.05)' })}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: 'var(--glass-border)', background: 'rgba(255,255,255,0.03)' })}
            />
            <input
              type="email" name="email" placeholder="Your Email" required
              disabled={!formData.name.trim()}
              title={!formData.name.trim() ? "Please enter your name first" : ""}
              value={formData.email} onChange={handleChange} style={{ ...inputStyle, opacity: !formData.name.trim() ? 0.4 : 1, cursor: !formData.name.trim() ? 'not-allowed' : 'text' }}
              onFocus={(e) => Object.assign(e.target.style, { borderColor: 'var(--accent-light)', background: 'rgba(255,255,255,0.05)' })}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: 'var(--glass-border)', background: 'rgba(255,255,255,0.03)' })}
            />
            <textarea
              name="message" rows="5" placeholder="Your Message" required
              disabled={!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())}
              title={!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim()) ? "Please enter a valid @gmail.com address first" : ""}
              value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical', opacity: !/^[^\s@]+@gmail\.com$/i.test(formData.email.trim()) ? 0.4 : 1, cursor: !/^[^\s@]+@gmail\.com$/i.test(formData.email.trim()) ? 'not-allowed' : 'text' }}
              onFocus={(e) => Object.assign(e.target.style, { borderColor: 'var(--accent-light)', background: 'rgba(255,255,255,0.05)' })}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: 'var(--glass-border)', background: 'rgba(255,255,255,0.03)' })}
            ></textarea>

            <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{
              padding: '16px', fontSize: '1.1rem', opacity: status === 'sending' ? 0.7 : 1, marginTop: '10px'
            }}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'invalid_email' && (
              <p style={{ color: '#f87171', marginTop: '15px', textAlign: 'center', padding: '10px', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '8px' }}>
                Please use a valid @gmail.com address.
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#f87171', marginTop: '15px', textAlign: 'center', padding: '10px', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '8px' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Success Modal */}
      {status === 'success' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <div className="glass-panel animate-fade-in" style={{
            padding: '50px 70px',
            textAlign: 'center',
            background: 'var(--glass-bg)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 className="heading-display" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '15px' }}>Inquiry Received</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6 }}>Thank you for reaching out. Your message has been successfully delivered, and I will be in touch with you shortly.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
