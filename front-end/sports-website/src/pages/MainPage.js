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
  Menu,
  MenuItem,
} from '@mui/material';

function MainPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]); // State to store game data for all sports
  const [filteredGames, setFilteredGames] = useState([]); // State to store filtered games
  const [error, setError] = useState(''); // State to handle errors
  const [username, setUsername] = useState(''); // State to store username
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedName = localStorage.getItem('username'); // Fetch the updated name
    if (savedName) setUsername(savedName); // Update username dynamically
  
    if (!token) {
      alert('You need to log in first!');
      navigate('/login');
      return;
    }

    // Fetch user profile data to get the username
    fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
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
          setUsername(data.username);
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
          { url: '/api/games/nfl-games', sport: 'NFL' },
          { url: '/api/games/nba-games', sport: 'NBA' },
          { url: '/api/games/nlb-games', sport: 'MLB' },
          { url: '/api/games/nhl-games', sport: 'NHL' },
          { url: '/api/games/soc-games', sport: 'Soccer' },
        ];
        const results = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint.url, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch data from ${endpoint.url}`);
              }
              return response.json().then((data) => ({
                sport: endpoint.sport,
                games: data,
              }));
            })
          )
        );

        // Combine all the games into one array with sport labels
        const combinedGames = results.flatMap(({ sport, games }) =>
          games.map((game) => ({ ...game, sport }))
        );
        setGames(combinedGames); // Set the game data for all sports
        setFilteredGames(combinedGames); // Initially show all games
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch game data for all sports');
      }
    };

    fetchAllSportsData();
  }, [navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (sport) => {
    setAnchorEl(null);
    if (sport === 'All') {
      setFilteredGames(games); // Show all games
    } else {
      setFilteredGames(games.filter((game) => game.sport === sport)); // Filter by selected sport
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
          <Button
            color="inherit"
            onClick={handleMenuClick}
          >
            Filter Games
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose('All')}
          >
            <MenuItem onClick={() => handleMenuClose('All')}>All Games</MenuItem>
            <MenuItem onClick={() => handleMenuClose('NFL')}>NFL Games</MenuItem>
            <MenuItem onClick={() => handleMenuClose('NBA')}>NBA Games</MenuItem>
            <MenuItem onClick={() => handleMenuClose('MLB')}>MLB Games</MenuItem>
            <MenuItem onClick={() => handleMenuClose('NHL')}>NHL Games</MenuItem>
            <MenuItem onClick={() => handleMenuClose('Soccer')}>Soccer Games</MenuItem>
          </Menu>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Display Games for Selected Sport */}
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          {filteredGames.length > 0 ? `Upcoming Games` : 'No Games Available'}
        </Typography>
        <Grid container spacing={2}>
          {filteredGames.map((game, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={3}
                style={{
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Home Team */}
                <Box display="flex" alignItems="center" flex={1}>
                  <Avatar
                    src={game.teams[0]?.logo}
                    alt={game.teams[0]?.name}
                    style={{ marginRight: '10px', width: '40px', height: '40px' }}
                  />
                  <Typography variant="h6">{game.teams[0]?.displayName}</Typography>
                </Box>

                {/* Match Time */}
                <Box textAlign="center" flex={1}>
                  <Typography variant="h6">{game.status?.shortDetail || 'Time TBD'}</Typography>
                </Box>

                {/* Away Team */}
                <Box display="flex" alignItems="center" flex={1} justifyContent="flex-end">
                  <Typography variant="h6" style={{ marginRight: '10px' }}>
                    {game.teams[1]?.displayName}
                  </Typography>
                  <Avatar
                    src={game.teams[1]?.logo}
                    alt={game.teams[1]?.name}
                    style={{ width: '40px', height: '40px' }}
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
