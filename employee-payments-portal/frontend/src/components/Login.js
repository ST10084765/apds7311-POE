import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { useAuth } from './AuthContext';
import './Login.css'; // Import shared styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      console.log('Success:', data);
      alert('Login successful!');
      login(data);
      navigate('/payment');
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('Failed to log in: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
