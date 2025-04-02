import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to Spotify Stats</h1>
      <button onClick={() => { navigate('/profile') }}>Profile</button>
    </div>
  );
};

export default HomePage;