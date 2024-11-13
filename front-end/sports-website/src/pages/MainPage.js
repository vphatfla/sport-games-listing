// src/pages/MainPage.js
import React from 'react';
import SportsList from '../components/SportsList';
import MatchList from '../components/MatchList';
import ProfileIcon from '../components/ProfileIcon';

function MainPage() {
  return (
    <div>
      <ProfileIcon />
      <SportsList />
      <MatchList />
    </div>
  );
}

export default MainPage;
