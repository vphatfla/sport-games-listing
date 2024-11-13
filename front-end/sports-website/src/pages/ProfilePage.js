// src/pages/ProfilePage.js
import React from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';

const teams = ['Team A', 'Team B', 'Team C', 'Team D'];

function ProfilePage() {
  const [favorites, setFavorites] = React.useState([]);

  const handleFavoritesChange = (event) => {
    setFavorites(event.target.value);
  };

  return (
    <div>
      <h2>Your Account</h2>
      <TextField label="Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />

      <h2>My List</h2>
      <Select
        multiple
        value={favorites}
        onChange={handleFavoritesChange}
        fullWidth
      >
        {teams.map((team) => (
          <MenuItem key={team} value={team}>
            {team}
          </MenuItem>
        ))}
      </Select>

      <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
        Logout
      </Button>
    </div>
  );
}

export default ProfilePage;
