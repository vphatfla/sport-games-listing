import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';

function MainPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]); // State to store game data for all sports
  const [error, setError] = useState(''); // State to handle errors
  const [username, setUsername] = useState(''); // State to store username

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Fetch user profile data to get the username
    fetch('/api/profile', {
      method: 'POST', // Correct method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'), // Assuming the username is stored
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.username) {
          setUsername(data.username); // Set the username
        } else {
          throw new Error('Username not found in response');
        }
      })
      .catch((err) => {
        console.error(err.message);
        setError('Could not fetch user profile');
      });

    // Fetch all sports data sequentially
    const fetchAllSportsData = async () => {
      try {
        const endpoints = [
          '/api/games/nfl-games',
          '/api/games/nba-games',
          '/api/games/nlb-games',
          '/api/games/nhl-games',
          '/api/games/soc-games',
        ];
        const results = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch data from ${endpoint}`);
              }
              return response.json();
            })
          )
        );

        // Combine all the games into one array
        const combinedGames = results.flat();
        setGames(combinedGames); // Set the game data for all sports
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch game data for all sports');
      }
    };

    fetchAllSportsData();
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
            {username ? `Hello, ${username}` : 'Loading...'}
          </Typography>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Display Games for All Sports */}
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Upcoming Games
        </Typography>
        <Grid container spacing={2}>
          {games.map((game, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={3}
                style={{
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Home Team */}
                <Box display="flex" alignItems="center" flex={1}>
                  <Avatar
                    src={game.teams[0]?.logo}
                    alt={game.teams[0]?.name}
                    style={{ marginRight: '10px', width: '40px', height: '40px' }}
                  />
                  <Typography variant="h6">
                    {game.teams[0]?.displayName}
                  </Typography>
                </Box>

                {/* Match Time */}
                <Box textAlign="center" flex={1}>
                  <Typography variant="h6">{game.status?.shortDetail}</Typography>
                </Box>

                {/* Away Team */}
                <Box
                  display="flex"
                  alignItems="center"
                  flex={1}
                  justifyContent="flex-end"
                >
                  <Typography variant="h6" style={{ marginRight: '10px' }}>
                    {game.teams[1]?.displayName}
                  </Typography>
                  <Avatar
                    src={game.teams[1]?.logo}
                    alt={game.teams[1]?.name}
                    style={{ marginLeft: '10px', width: '40px', height: '40px' }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MainPage;
