import React, { useState, useEffect } from 'react';
import Chat from './components/chat';
import Auth from './components/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {/* Background image div with blur */}
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
          zIndex: -1, // behind everything
        }}
      ></div>

      {/* Main content container */}
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          backgroundColor: 'transparent',
          color: 'white',
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
          }}
        >
          Inteligia Bot
        </header>

        {isAuthenticated ? <Chat /> : <Auth onAuthSuccess={handleAuthSuccess} />}
      </div>
    </>
  );
}

export default App;
