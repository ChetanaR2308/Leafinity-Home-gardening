// frontend/src/components/Home.jsx
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section
        className="hero-section"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/39/64/13/396413190a417f0d4a87a1f6ad440e4f.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="hero-content">
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Grow Your Garden with Confidence
          </h2>
          <p
            style={{
              fontSize: '1.25rem',
              marginTop: '1rem',
              textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
              maxWidth: '800px',
              marginInline: 'auto',
            }}
          >
            Whether you're a beginner or a seasoned gardener, our platform connects you with expert advice, tailored plant care guides, and powerful tools to help your garden flourish year-round.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
