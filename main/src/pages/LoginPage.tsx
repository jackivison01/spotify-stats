import React from 'react';
import LogInButton from '../components/login/LogInButton';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Add login logic here
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