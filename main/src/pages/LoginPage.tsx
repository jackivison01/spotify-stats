import React from 'react';
import LogInButton from '../components/login/LogInButton';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    const clientId = '49bc21756a90498798430c482a071f4d';
    const redirectUri = 'http://localhost:5173/callback';
    const scopes = [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'user-top-read',
    ]; // Add more scopes as needed

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(' '))}`;
    window.location.href = authUrl;
    console.log('Login button clicked');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login to Spotify Stats</h1>
      <LogInButton handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;