import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const server_url = require('./config');

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async () => {
    try {
      const response = await fetch(server_url + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        navigate('/home');
      } else {
        alert(data.message || 'Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(server_url + '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          name: username,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page
      } else {
        alert(data.message || 'Sign-up failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundImage: `url('/soccer.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'space-between',
        padding: '50px',
      }}
    >
      {/* Title Section */}
      <Box sx={{ marginTop: '50px', marginLeft: '50px' }}>
        <Typography
          variant="h3"
          color="white"
          fontWeight="bold"
          gutterBottom
        >
          POOSPN
        </Typography>
        <Typography variant="h6" color="white">
          Get the latest updates on your favorite sports teams.
        </Typography>
      </Box>

      {/* Login Box */}
      <Box
        sx={{
          width: '400px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginRight: '50px',
          alignSelf: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={isLogin ? handleLogin : handleSignUp}
          sx={{ marginTop: '20px' }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>

        <Box mt={2} textAlign="center">
          <Link component="button" variant="body2" onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Sign Up here."
              : 'Already have an account? Login here.'}
          </Link>
        </Box>
      </Box>
    </Box>
  );
}


export default LoginPage;
