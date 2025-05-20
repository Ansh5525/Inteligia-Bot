import React, { useState, useEffect } from 'react';
import Chat from './components/chat';
import Auth from './components/auth'; // assume Auth is saved here

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
    <div>
      <h1>AI WebChat</h1>
      {isAuthenticated ? <Chat /> : <Auth onAuthSuccess={handleAuthSuccess} />}
    </div>
  );
}

export default App;
