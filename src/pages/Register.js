import React, { useState } from 'react';

const Register = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name, // If your backend expects 'username', use name as username
          email: email,
          password: password
        }),
      });
      if (response.ok) {
        setSuccess('Registration successful! Please login.');
        setTimeout(() => setCurrentPage('login'), 1500);
      } else {
        const errMsg = await response.text();
        setError(errMsg);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
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
