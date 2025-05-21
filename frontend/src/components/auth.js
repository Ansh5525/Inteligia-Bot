import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/auth/${isLogin ? 'login' : 'register'}`;

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

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px 25px',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: 'center',
    },
    heading: {
      marginBottom: '25px',
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
    },
    input: {
      width: '85%',
      padding: '12px 15px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1.5px solid #ddd',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#0b93f6',
      boxShadow: '0 0 5px #0b93f6',
    },
    submitBtn: {
      width: '100%',
      padding: '12px 0',
      borderRadius: '30px',
      border: 'none',
      backgroundColor: '#0b93f6',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    submitBtnHover: {
      backgroundColor: '#0977d6',
    },
    toggleBtn: {
      marginTop: '15px',
      background: 'none',
      border: 'none',
      color: '#0b93f6',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  // Input focus handling for style
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(emailFocused ? styles.inputFocus : {}),
          }}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            ...styles.input,
            ...(passwordFocused ? styles.inputFocus : {}),
          }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <button
          type="submit"
          style={styles.submitBtn}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0977d6')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0b93f6')}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={toggleMode} style={styles.toggleBtn}>
        {isLogin ? 'Create Account' : 'Have an account? Login'}
      </button>
    </div>
  );
};

export default Auth;
