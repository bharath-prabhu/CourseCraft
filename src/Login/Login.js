import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton, Alert } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import SignUp from './SignUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async () => {
    if (username === 'Bharath' && password === 'Bharath.p1611') {
      setSuccessMessage('Welcome, Admin! You have logged in successfully.');
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username); // Store username
        navigate('/admin'); // Navigate to admin page
        onClose(); // Close the login modal
        window.location.reload(); // Refresh the page
      }, 3000);
    } else {
      try {
        const response = await axios.post('http://localhost:8080/course/login', {
          username,
          password,
        });

        if (response.status === 200) {
          setSuccessMessage('Welcome! You have logged in successfully.');
          setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username); // Store username
            onLogin(); // Update the state in NavBar to indicate logged in
            onClose(); // Close the login modal
            window.location.reload(); // Refresh the page
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAlertMessage('Invalid credentials. Please try again.');
        } else {
          setAlertMessage('An error occurred. Please try again.');
        }
      }
    }
  };

  const handleSignUp = () => {
    setIsSignUpModalOpen(true);
    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <FaTimes />
          </IconButton>
          <Typography id="login-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          {alertMessage && (
            <Alert severity="error" onClose={() => setAlertMessage('')} sx={{ mt: 2 }}>
              {alertMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </Modal>
      <SignUp isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </>
  );
};

export default Login;
