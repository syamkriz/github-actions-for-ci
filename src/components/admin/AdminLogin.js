/**
 * src/components/admin/AdminLogin.js
 *
 * This component provides a login form for administrators.
 * It handles user input for username and password, makes an API call to the
 * backend for authentication, and manages login success (e.g., storing a token)
 * or error states.
 */
import React, { useState } from 'react';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }
      localStorage.setItem('adminToken', data.token); // Store token
      if(onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err); // Keep console log for debugging
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: '20px' }}>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
