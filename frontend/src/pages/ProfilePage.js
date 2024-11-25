import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

const server_url = require('./config');

function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [favoriteSports, setFavoriteSports] = useState([]);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const sportsOptions = ["NFL", "NBA", "MLB", "NHL", "Soccer"];

  // Fetch user profile data
  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("You need to log in first!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      navigate("/login");
      return;
    }

    fetch(server_url + "/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        const serverSports = data.favoriteSports || [];
        setFavoriteSports(serverSports);

        // Save to local storage for persistence
        localStorage.setItem("favoriteSports", JSON.stringify(serverSports));
      })
      .catch((err) => {
        // If there is an error, fallback to localStorage
        const storedSports = JSON.parse(localStorage.getItem("favoriteSports"));
        if (storedSports) {
          setFavoriteSports(storedSports);
        }
        setError(err.message);
        console.error(err.message);
      });
  };

  // Run fetchProfile on mount
  useEffect(() => {
    const storedSports = JSON.parse(localStorage.getItem("favoriteSports"));
    if (storedSports) {
      setFavoriteSports(storedSports);
    }
    fetchProfile();
  }, [navigate]);

  // Save profile changes
  const handleSaveChanges = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("You need to log in first!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      navigate("/login");
      return;
    }
  
    fetch(server_url + "/api/profile/setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        name,
        favoriteSports,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save profile data");
        }
        return res.json();
      })
      .then(() => {
        setSnackbarMessage("Profile updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
  
        // Update the localStorage with the new name
        localStorage.setItem("username", name);
  
        // Save favorite sports to local storage
        localStorage.setItem("favoriteSports", JSON.stringify(favoriteSports));
      })
      .catch((err) => {
        setSnackbarMessage("Error saving profile: " + err.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error(err.message);
      });
  };
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("favoriteSports"); // Clear local storage on logout
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Profile Page
          </Typography>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Edit Your Profile
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Favorite Sports
        </Typography>
        <Select
          multiple
          value={favoriteSports}
          onChange={(e) => setFavoriteSports(e.target.value)}
          fullWidth
        >
          {sportsOptions.map((sport) => (
            <MenuItem key={sport} value={sport}>
              {sport}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          style={{ marginTop: "20px" }}
        >
          Save Changes
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProfilePage;
