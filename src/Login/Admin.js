import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Admin.css';

const Admin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (validateAdminLogin()) {
      if (username === 'Bharath' && password === 'Bharath.P1611') {
        onAdminLogin();
        clearForm();
        navigate('/admin');
      } else {
        alert('Invalid admin username or password');
      }
    }
  };

  const validateAdminLogin = () => {
    if (username === '' || password === '') {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className="modal">
      <form onSubmit={handleAdminLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
