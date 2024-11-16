import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
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
        navigate('/');
      } else {
        alert(data.message || 'Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSignUp = async () => {
    // Ensure passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Optional: Add input validation here (e.g., minimum password length)
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          name: username, // Replace with a separate name field if applicable
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Alert the user and navigate to the main page
        alert('Registration successful!');
        navigate('/'); // Redirect to the main page or login page
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
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={3}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
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
          style={{ marginTop: '20px' }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>

        <Box mt={2}>
          <Link component="button" variant="body2" onClick={toggleForm}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
