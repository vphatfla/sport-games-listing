// src/pages/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = () => {
    // Here you would typically handle login logic,
    // such as authenticating with a backend API
    console.log('Login - Email:', email);
    console.log('Password:', password);
    
    // After successful login, navigate to main page
    navigate('/');
  };

  const handleSignUp = () => {
    // Here you would typically handle sign-up logic
    console.log('Sign Up - Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // After successful sign-up, navigate to main page
    navigate('/');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
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
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
