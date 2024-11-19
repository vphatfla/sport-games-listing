import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, AppBar, Toolbar } from "@mui/material";

function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    fetch("/api/profile", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "username": localStorage.getItem("username")
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.username); // Non-editable
        setName(data.name);
        setFavoriteTeam(data.favoriteTeam.join(", "));
      })
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  }, [navigate]);

  const handleSaveChanges = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    fetch("/api/profile/setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username, // Unchanged
        name,
        favoriteTeam: favoriteTeam.split(",").map((team) => team.trim()), // Convert to array
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save profile data");
        }
        return res.json();
      })
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      {/* Navigation Bar */}
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

      {/* Profile Content */}
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Edit Your Profile
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Username"
          value={username}
          fullWidth
          margin="normal"
          disabled // Username is non-editable
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Favorite Teams"
          value={favoriteTeam}
          onChange={(e) => setFavoriteTeam(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          style={{ marginTop: "20px" }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
