import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log the full URL and the hash part for debugging
    //console.log("Current URL:", window.location.href);
    //console.log("URL Hash:", window.location.hash);

    const token = getTokenFromResponse();
    if (token) {
      //console.log("Extracted Token:", token);
      console.log("Navigating to music-stats")
      navigate('/music-stats'); // Redirect to MusicStatsPage
    } else {
      // Redirect to home or login page if no token is found
      console.log("No token found in URL hash");
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
