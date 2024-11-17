import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';

function MainPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]); // State to store game data
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    // Check if the user is logged in (token exists in localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      navigate('/login'); // Redirect to login if not logged in
    } else {
      // Fetch NFL games data
      fetch('/api/games/nfl-games', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          setGames(data); // Set the game data
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            NFL Games
          </Typography>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Display NFL Games */}
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          NFL Games - Week 11
        </Typography>
        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={game.teams[0].logo} // Use home team logo
                  alt={game.teams[0].name}
                />
                <CardContent>
                  <Typography variant="h6">{game.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {game.status.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {game.status.detail}
                  </Typography>
                  <Typography variant="body2">
                    Home: {game.teams[0].displayName} vs. Away: {game.teams[1].displayName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MainPage;
