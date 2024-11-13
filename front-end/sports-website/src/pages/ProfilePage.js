// src/pages/ProfilePage.js
import React from 'react';
import { TextField, Select, MenuItem, Box, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const teams = ['Team A', 'Team B', 'Team C', 'Team D'];

function ProfilePage() {
  const [favorites, setFavorites] = React.useState([]);
  const navigate = useNavigate();

  const handleFavoritesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFavorites(
      // On deselecting, it removes the value from the array
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleHome = () => {
    navigate('/'); // Navigate to the main page
  };

  return (
    <Box p={3}>
      {/* Home and Logout buttons in the top right corner */}
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
      <TextField label="Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />

      <Typography variant="h5" gutterBottom>
        My List
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
    </Box>
  );
}

export default ProfilePage;
