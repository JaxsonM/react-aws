import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromResponse();
    if (token) {
      console.log("Navigating to music-stats")
      navigate('/music-stats'); // Redirect to MusicStatsPage
    } else {
      // Redirect to home or login page if no token is found
      navigate('/');
    }
  }, [navigate]);

  const getTokenFromResponse = () => {
    const parsedHash = queryString.parse(window.location.hash);
    const token = parsedHash.access_token;

    if (token) {
        localStorage.setItem('spotifyAuthToken', token);  // Store the token
    }

    return token;
};

  return <div>Redirecting...</div>;
};

export default CallbackPage;
