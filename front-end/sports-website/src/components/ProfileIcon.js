// src/components/ProfileIcon.js
import React from 'react';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function ProfileIcon() {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate('/profile')}>
      <AccountCircleIcon fontSize="large" />
    </IconButton>
  );
}

export default ProfileIcon;
