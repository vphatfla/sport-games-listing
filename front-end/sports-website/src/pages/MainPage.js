// src/pages/MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import SportsList from '../components/SportsList';
import MatchList from '../components/MatchList';
import ProfileIcon from '../components/ProfileIcon';

function MainPage() {
  return (
    <div>
    <p><Link to="/login">Log Out</Link></p>
      <ProfileIcon />
      <SportsList />
      <MatchList />
    </div>
  );
}

export default MainPage;
