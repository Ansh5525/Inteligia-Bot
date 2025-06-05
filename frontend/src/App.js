import React, { useState, useEffect } from 'react';
import Chat from './components/chat';
import Auth from './components/auth';
import LandingPage from './components/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [landingDone, setLandingDone] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthSuccess = () => setIsAuthenticated(true);

  const handleStart = () => {
    setHasStarted(true);
    setTimeout(() => {
      setLandingDone(true);
    }, 1400); // slightly reduced delay to avoid lingering
  };

  return (
    <>
      {/* Background image stays behind */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: "url('/images/auth-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      ></div>

      {!landingDone && <LandingPage onStart={handleStart} />}

      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          backgroundColor: 'transparent',
          color: 'white',
          pointerEvents: landingDone ? 'auto' : 'none',
        }}
      >
        <header
          style={{
            backgroundColor: '#000000',
            padding: '20px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            color: 'white',
            opacity: hasStarted ? 1 : 0,
            transition: 'opacity 0.3s ease-in',
          }}
        >
          INTELIGIA BOT
        </header>

        {landingDone && (isAuthenticated ? (
          <Chat />
        ) : (
          <Auth onAuthSuccess={handleAuthSuccess} />
        ))}
      </div>
    </>
  );
}

export default App;
