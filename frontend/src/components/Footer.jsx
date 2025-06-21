import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: '#064e3b',
      color: '#e6fffa',
      padding: '3rem 1rem',
      fontFamily: '"Segoe UI", sans-serif'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '2rem',
    },
    column: {
      flex: '1 1 220px',
      marginBottom: '1.5rem',
    },
    heading: {
      color: '#bbf7d0',
      fontSize: '1.25rem',
      marginBottom: '1rem',
      fontWeight: '600'
    },
    paragraph: {
      color: '#ccfbf1',
      fontSize: '0.95rem',
      lineHeight: '1.6'
    },
    button: {
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      width: '100%',
      marginBottom: '10px',
      backgroundColor: '#10b981',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s ease, transform 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#059669',
      transform: 'translateY(-2px)',
    },
    outlineButton: {
      fontSize: '0.85rem',
      padding: '0.4rem 0.8rem',
      borderRadius: '8px',
      border: '1px solid #e6fffa',
      backgroundColor: 'transparent',
      color: '#e6fffa',
      marginRight: '0.5rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease, color 0.3s ease'
    },
    outlineHover: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderColor: '#10b981'
    },
    iconRow: {
      fontSize: '20px',
      display: 'flex',
      gap: '15px'
    },
    icon: {
      color: '#e6fffa',
      transition: 'transform 0.3s ease, color 0.3s ease',
      cursor: 'pointer'
    },
    iconHover: {
      color: '#bbf7d0',
      transform: 'scale(1.1)'
    },
    hr: {
      margin: '2rem 0 1rem',
      height: '1px',
      border: 'none',
      backgroundColor: '#065f46'
    },
    textRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      textAlign: 'center',
      gap: '1rem'
    },
    textLeft: {
      flex: '1 1 300px',
      textAlign: 'left'
    },
    textRight: {
      flex: '1 1 300px',
      textAlign: 'right'
    },
    responsiveCenter: {
      textAlign: 'center',
    }
  };

  const handleHover = (e, isHover, type) => {
    const style = e.target.style;
    if (type === 'btn') {
      style.backgroundColor = isHover ? '#059669' : '#10b981';
      style.transform = isHover ? 'translateY(-2px)' : 'none';
    } else if (type === 'outline') {
      style.backgroundColor = isHover ? '#10b981' : 'transparent';
      style.color = isHover ? '#ffffff' : '#e6fffa';
      style.borderColor = isHover ? '#10b981' : '#e6fffa';
    } else if (type === 'icon') {
      style.color = isHover ? '#bbf7d0' : '#e6fffa';
      style.transform = isHover ? 'scale(1.1)' : 'none';
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.column}>
            <h5 style={styles.heading}>About Garden Hub</h5>
            <p style={styles.paragraph}>
              Your one-stop destination for home gardening success. Connect with fellow gardeners, share knowledge, and grow together.
            </p>
          </div>
          <div style={styles.column}>
            <h5 style={styles.heading}>Quick Links</h5>
            <button
              style={styles.button}
              onMouseEnter={(e) => handleHover(e, true, 'btn')}
              onMouseLeave={(e) => handleHover(e, false, 'btn')}
              onClick={() => navigate('/calender')}
            >
              Plant Calendar
            </button>
            <button
              style={styles.button}
              onMouseEnter={(e) => handleHover(e, true, 'btn')}
              onMouseLeave={(e) => handleHover(e, false, 'btn')}
              onClick={() => navigate('/database')}
            >
              Growing Guide
            </button>
            <button
              style={styles.button}
              onMouseEnter={(e) => handleHover(e, true, 'btn')}
              onMouseLeave={(e) => handleHover(e, false, 'btn')}
              onClick={() => navigate('/exchange')}
            >
              Seed Exchange
            </button>
          </div>
          <div style={styles.column}>
            <h5 style={styles.heading}>Community</h5>
            <button
              style={styles.button}
              onMouseEnter={(e) => handleHover(e, true, 'btn')}
              onMouseLeave={(e) => handleHover(e, false, 'btn')}
              onClick={() => navigate('/consultation')}
            >
              Expert Help
            </button>
            <button
              style={styles.button}
              onMouseEnter={(e) => handleHover(e, true, 'btn')}
              onMouseLeave={(e) => handleHover(e, false, 'btn')}
              onClick={() => navigate('/marketplace')}
            >
              Marketplace
            </button>
          </div>
          <div style={styles.column}>
            <h5 style={styles.heading}>Connect With Us</h5>
            <div style={styles.iconRow}>
              {['facebook', 'twitter', 'instagram', 'pinterest'].map((icon, idx) => (
                <a key={idx} href="#">
                  <i
                    className={`fab fa-${icon}`}
                    style={styles.icon}
                    onMouseEnter={(e) => handleHover(e, true, 'icon')}
                    onMouseLeave={(e) => handleHover(e, false, 'icon')}
                  ></i>
                </a>
              ))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#ccfbf1' }}>
              📞 +91-9876543210
            </p>
          </div>
        </div>

        <hr style={styles.hr} />

        <div style={styles.textRow}>
          <div style={styles.textLeft}>
            <p>© {currentYear} Garden Hub. All rights reserved.</p>
          </div>
          <div style={styles.textRight}>
            <button
              style={styles.outlineButton}
              onMouseEnter={(e) => handleHover(e, true, 'outline')}
              onMouseLeave={(e) => handleHover(e, false, 'outline')}
              onClick={() => navigate('/privacy')}
            >
              Privacy Policy
            </button>
            <button
              style={styles.outlineButton}
              onMouseEnter={(e) => handleHover(e, true, 'outline')}
              onMouseLeave={(e) => handleHover(e, false, 'outline')}
              onClick={() => navigate('/terms')}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
