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

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={toggleMode} style={{ marginTop: '10px' }}>
        {isLogin ? 'Create Account' : 'Have an account? Login'}
      </button>
    </div>
  );
};

export default Auth;
