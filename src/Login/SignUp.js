import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton, FormHelperText } from '@mui/material';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

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

const textFieldStyle = (hasError) => ({
  margin: 'normal',
  required: true,
  fullWidth: true,
  sx: {
    '& .MuiInputBase-root': {
      borderColor: hasError ? 'red' : 'inherit',
    },
    '& .MuiFormLabel-root': {
      color: hasError ? 'red' : 'inherit',
    },
  },
});

const SignUp = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post('http://localhost:8080/course/checkemail', email, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error checking email existence', err);
      return false;
    }
  };

  const handleSignUp = async () => {
    let errors = {
      username: !username,
      email: !email,
      password: !password,
      confirmPassword: !confirmPassword,
    };

    setFieldErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError('Email already exists.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/course/adduser', {
        username,
        email,
        password,
      });
      setError('');
      onClose();
    } catch (err) {
      setError('email is Already exist. Please try again.');
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="sign-up-modal-title"
      aria-describedby="sign-up-modal-description"
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
        <Typography id="sign-up-modal-title" variant="h6" component="h2">
          Sign Up
        </Typography>
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
          error={fieldErrors.username}
          helperText={fieldErrors.username ? 'Username is required.' : ''}
          sx={textFieldStyle(fieldErrors.username)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          helperText={fieldErrors.email ? 'Email is required.' : ''}
          sx={textFieldStyle(fieldErrors.email)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          helperText={fieldErrors.password ? 'Password is required.' : ''}
          sx={textFieldStyle(fieldErrors.password)}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          helperText={fieldErrors.confirmPassword ? 'Confirm Password is required.' : ''}
          sx={textFieldStyle(fieldErrors.confirmPassword)}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            ),
          }}
        />
        {error && (
          <FormHelperText error>{error}</FormHelperText>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>
      </Box>
    </Modal>
  );
};

export default SignUp;
