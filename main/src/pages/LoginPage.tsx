import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Add login logic here
    console.log('Login button clicked');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Login to Spotify Stats</h1>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Log In
      </button>
    </div>
  );
};

export default LoginPage;