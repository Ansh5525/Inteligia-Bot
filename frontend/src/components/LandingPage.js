import React, { useState, useRef, useEffect } from 'react';

const LandingPage = ({ onStart }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0.5, y: 0.5 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasShrunk, setHasShrunk] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isAnimating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCursorPos({ x, y });
  };

  const handleStartClick = () => {
    setIsAnimating(true);

    // Wait for shrink animation (~1.5s), then fade out
    setTimeout(() => {
      setHasShrunk(true);
    }, 900);

    // Wait for total transition (~1.8s), then call onStart
    setTimeout(() => {
      onStart();
    }, 1200);
  };

  const gradientX = cursorPos.x * 100;
  const gradientY = cursorPos.y * 100;

  const headerHeight = 80;

  const containerStyle = {
    height: isAnimating ? `${headerHeight}px` : '100vh',
    width: '100vw',
    background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(80,0,0,0.95), #1a0000 80%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'hidden',
    zIndex: 10,
    transition: 'height 0.9s ease, background 0.9s ease, opacity 0.3s ease 0.9s',
    pointerEvents: isAnimating ? 'none' : 'auto',
    opacity: hasShrunk ? 0 : 1,
  };

  const textStyle = {
    fontSize: isAnimating ? '1.8rem' : '10vw',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: 0,
    textShadow: isAnimating
      ? 'none'
      : `0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.5)`,
    transition: 'font-size 1.5s ease, text-shadow 1.5s ease',
    lineHeight: 1.1,
  };

  const buttonStyle = {
    marginTop: '40px',
    padding: '16px 36px',
    fontSize: '1.2rem',
    fontWeight: '700',
    borderRadius: '40px',
    border: 'none',
    backgroundColor: '#b30010',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(179, 0, 16, 0.6)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseMove={handleMouseMove}
    >
      <h1 style={textStyle}>INTELIGIA BOT</h1>

      {!isAnimating && (
        <button
          style={buttonStyle}
          onClick={handleStartClick}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 0 30px rgba(179, 0, 16, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 0 20px rgba(179, 0, 16, 0.6)';
          }}
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default LandingPage;
