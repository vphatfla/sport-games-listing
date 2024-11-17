import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Box, IconButton, Typography, Button, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const teams = ['Team A', 'Team B', 'Team C', 'Team D'];

function ProfilePage() {
  const navigate = useNavigate();

  // State for user profile
  const [name, setName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (savedName) setName(savedName);
    setFavorites(savedFavorites);
  }, []);

  // Handle favorite teams selection
  const handleFavoritesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFavorites(typeof value === 'string' ? value.split(',') : value);
  };

  // Save changes locally
  const handleSaveChanges = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setSuccessMessage('Changes saved successfully!'); // Set success message
    setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
  };

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleHome = () => {
    navigate('/'); // Navigate to the main page
  };

  return (
    <Box p={3}>
      {/* Home and Logout buttons */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <IconButton onClick={handleHome} color="primary">
          <HomeIcon />
        </IconButton>
        <IconButton onClick={handleLogout} color="primary">
          <LogoutIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" gutterBottom>
        Your Account
      </Typography>

      {/* Display Success Message */}
      {successMessage && (
        <Alert severity="success" style={{ marginBottom: '20px' }}>
          {successMessage}
        </Alert>
      )}

      {/* Name Field */}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Favorite Teams */}
      <Typography variant="h5" gutterBottom>
        My Favorite Teams
      </Typography>
      <Select
        multiple
        value={favorites}
        onChange={handleFavoritesChange}
        fullWidth
        renderValue={(selected) => selected.join(', ')}
      >
        {teams.map((team) => (
          <MenuItem key={team} value={team}>
            {team}
          </MenuItem>
        ))}
      </Select>

      {/* Save Changes Button */}
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
