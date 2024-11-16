import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SportsList from '../components/SportsList';
import MatchList from '../components/MatchList';
import ProfileIcon from '../components/ProfileIcon';

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (token exists in localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <div>
      {/* Logout link */}
      <p>
        <Link to="/login">Log Out</Link>
      </p>

      {/* Add old components back */}
      <ProfileIcon />
      <SportsList />
      <MatchList />
    </div>
  );
}

export default MainPage;
