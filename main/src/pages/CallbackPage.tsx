// src/pages/Callback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the access token from the URL fragment
    const hash = window.location.hash.substring(1); // Remove the leading '#'
    const params = new URLSearchParams(hash);

    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
      // Optionally store the token in localStorage or sessionStorage
      localStorage.setItem('spotifyAccessToken', token);
      // Navigate to a page where you can use the token, e.g., the home page
      navigate('/home');
    } else {
      // Handle error if no token is found
      console.log('No token found');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Callback</h1>
      {accessToken ? (
        <p>Logged in successfully! Access Token: {accessToken}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CallbackPage;
