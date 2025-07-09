import React, { useState } from 'react';

const Login = ({ setCurrentPage, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role || 'USER');
        setRole(data.role || 'USER');
        setCurrentPage('home');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2 className="auth-title">Sign In</h2>
        <div className="auth-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
            autoComplete="username"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-btn" type="submit">
          Login
        </button>
        <div className="auth-divider" />
        <div className="auth-secondary">
          <span>New user?</span>
          <button
            type="button"
            className="auth-link"
            onClick={() => setCurrentPage('register')}
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
