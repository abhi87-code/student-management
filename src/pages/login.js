import React, { useState } from 'react';

const Login = ({ setCurrentPage }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!userId.trim() || !password) {
      setError('Please enter both User ID and Password.');
      return;
    }
    // TODO: Replace with backend authentication
    setCurrentPage('home');
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2 className="auth-title">Sign In</h2>
        <div className="auth-field">
          <label htmlFor="userid">User ID</label>
          <input
            id="userid"
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="Enter your user ID"
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
