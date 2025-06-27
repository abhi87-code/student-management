// src/pages/Register.js
import React, { useState } from 'react';

const Register = ({ setCurrentPage }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId.trim() || !password || !confirmPassword || !name.trim()) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // TODO: Replace with backend registration logic
    setSuccess('Registration successful! Please login.');
    setTimeout(() => {
      setCurrentPage('login');
    }, 1500);
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2 className="auth-title">Register</h2>
        <div className="auth-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="userid">User ID</label>
          <input
            id="userid"
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="Choose a user ID"
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
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            id="confirmpassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <button className="auth-btn" type="submit">
          Register
        </button>
        <div className="auth-divider" />
        <div className="auth-secondary">
          <span>Already have an account?</span>
          <button
            type="button"
            className="auth-link"
            onClick={() => setCurrentPage('login')}
          >
            Login here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
