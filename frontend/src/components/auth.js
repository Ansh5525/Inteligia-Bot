import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onAuthSuccess }) => {
  const [activeBox, setActiveBox] = useState(null); // 'login' or 'register'

  // Separate states for login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Separate states for register inputs
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mode = activeBox || 'login';
    const url = `http://localhost:8080/api/auth/${mode}`;

    const data =
      mode === 'login'
        ? { email: loginEmail, password: loginPassword }
        : { email: registerEmail, password: registerPassword };

    try {
      const res = await axios.post(url, data);
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

  const containerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const contentWrapperStyle = {
    display: 'flex',
    zIndex: 1,
    position: 'relative',
    width: '90%',
    maxWidth: '1000px',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  };

  const boxStyle = (mode) => {
    const isActive = activeBox === mode;
    const isOtherHovered = activeBox && activeBox !== mode;

    return {
      width: '40%',
      height: '45vh',
      padding: '25px',
      margin: '10px',
      borderRadius: '12px',
      backgroundColor: '#fff',
      boxShadow: isActive
        ? '0 0 35px rgba(0, 0, 0, 0.7)'
        : '0 0 15px rgba(0, 0, 0, 0.3)',
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
      filter: isOtherHovered ? 'blur(2px)' : 'none',
      opacity: isOtherHovered ? 0.5 : 1,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
    };
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1rem',
  };

  const buttonStyle = {
    padding: '10px 25px',
    borderRadius: '25px',
    backgroundColor: '#e60023',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    alignSelf: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        {/* Login Box */}
        <div
          style={boxStyle('login')}
          onMouseEnter={() => setActiveBox('login')}
          onMouseLeave={() => setActiveBox(null)}
        >
          <h2 style={headingStyle}>Login</h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>Login</button>
          </form>
        </div>

        {/* Register Box */}
        <div
          style={boxStyle('register')}
          onMouseEnter={() => setActiveBox('register')}
          onMouseLeave={() => setActiveBox(null)}
        >
          <h2 style={headingStyle}>Register</h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
