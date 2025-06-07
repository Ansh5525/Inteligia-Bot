import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setAnimateIn(true), 100);
    const timeout2 = setTimeout(() => setContentVisible(true), 400);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/auth/${mode}`;

    try {
      const res = await axios.post(url, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        onAuthSuccess();
      } else {
        alert(res.data.message || 'Success');
      }
    } catch (err) {
      console.error(err);
      alert('Authentication failed');
    }
  };

  const handleToggleMode = () => {
    setContentVisible(false);
    setTimeout(() => {
      setMode(mode === 'login' ? 'register' : 'login');
      setTimeout(() => setContentVisible(true), 100);
    }, 250);
  };

  const containerStyle = {
    height: '80vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
  };

  const boxStyle = {
    width: animateIn ? '600px' : '60px',
    height: animateIn ? '450px' : '60px',
    opacity: animateIn ? 1 : 0,
    transform: animateIn ? 'scale(1)' : 'scale(0.6)',
    transition: 'all 0.5s ease',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: animateIn
      ? '0 0 35px rgba(0, 0, 0, 0.7)'
      : '0 0 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    padding: '35px',
    boxSizing: 'border-box',
    color: '#333',
    overflow: 'hidden',
  };

  const innerContentStyle = {
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? 'scale(1)' : 'scale(0.85)',
    transition: 'all 0.4s ease',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '25px',
    textAlign: 'center',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  };

  const inputStyle = {
    padding: '12px',
    marginBottom: '18px',
    borderRadius: '10px',
    border: '1.5px solid #ccc',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1rem',
    width: '95%',
    boxShadow: 'inset 0 0 8px rgba(255,0,0,0.4)',
  };

  const buttonStyle = {
    padding: '12px 30px',
    borderRadius: '30px',
    backgroundColor: '#b30010',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '12px',
    width: '100%',
    boxShadow: '0 0 20px rgba(179, 0, 16, 0.7)',
    transition: 'box-shadow 0.3s ease',
  };

  const toggleStyle = {
    marginTop: '28px',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#b30010',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: '600',
    userSelect: 'none',
  };

  const toggleText =
    mode === 'login'
      ? "Don't have an account? Create one"
      : 'Already have an account? Sign in';

  const headingText = mode === 'login' ? 'Sign In' : 'Register';

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <div style={innerContentStyle}>
          <h2 style={headingStyle}>{headingText}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 30px rgba(179, 0, 16, 0.9)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 20px rgba(179, 0, 16, 0.7)')
              }
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          <div style={toggleStyle} onClick={handleToggleMode}>
            {toggleText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
