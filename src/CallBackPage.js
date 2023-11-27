import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getCurrentUser } from 'aws-amplify/auth';
import axios from 'axios';

const CallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use the location hook


  useEffect(() => {
    //const code = getAuthorizationCodeFromResponse();
    const code = getAuthorizationCodeFromQuery();
    console.log('Current URL:', window.location.href);
    console.log('code:', code)
    if (code) {
      console.log("exchanging code")
      exchangeAuthorizationCodeForTokens(code).then(() => {
        console.log("Authorization code exchanged, navigating to music-stats");
        navigate('/music-stats'); // Redirect to MusicStatsPage
      }).catch(error => {
        console.error('Error during token exchange:', error);
        navigate('/'); // Redirect to home or error page
      });
    } else {
      navigate('/'); // Redirect to home or login page if no code is found
    }
  }, [navigate]);

  const getAuthorizationCodeFromQuery = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('code');
  };
  
  

  // Calls the backend to exchange the authorization code for access and refresh tokens
  const exchangeAuthorizationCodeForTokens = async (code) => {
    try {
      const currentUser = await getCurrentUser();
      // Ensure you're using the correct endpoint for your Lambda function
      const response = await axios.post('https://9kaizjbmk9.execute-api.us-east-1.amazonaws.com/dev/spotifytokenhandler-dev', {
        operation: 'exchange_code',
        code: code,
        username: currentUser.username
      });
      // Handle the response as needed
    } catch (error) {
      console.error('Error exchanging authorization code for tokens:', error);
      throw error; // Consider handling this more gracefully in your UI
    }  
  }

  return <div>Redirecting...</div>;
};

export default CallbackPage;