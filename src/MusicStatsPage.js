import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser, updateUserAttributes, fetchUserAttributes} from 'aws-amplify/auth';

const CLIENT_ID = '00ed30d4fa214614be034225cd52f0fb';
const REDIRECT_URI = encodeURIComponent('http://localhost:3000/callback');
const AUTH_SCOPES = ['user-top-read'];
const SCOPE = 'user-read-private user-read-email';
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${AUTH_SCOPES.join('%20')}&response_type=token&show_dialog=true`;

const sleep = (ms) => {
  console.log(`Sleeping for ${ms / 1000} seconds...`);
  return new Promise(resolve => setTimeout(resolve, ms));
};

const MusicStatsPage = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState('medium_term');
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);

  useEffect(() => {
    // Function to initiate the Spotify authorization process
    const initiateSpotifyAuth = () => {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${AUTH_SCOPES.join(' ')}&response_type=code&show_dialog=true`;
      window.location.href = authUrl; // Redirect the user to Spotify's authorization page
    };

    // Check if the user already has a stored authorization token
    const checkForSpotifyAccessToken = async () => {
        const userAttributes = await fetchUserAttributes();
        const authToken = userAttributes['custom:spotifyAccessToken'];

        if (authToken) {
          console.log("There is authToken")
          // If token exists, fetch the top artists
          fetchTopArtists(authToken, timeRange);
          console.log("FetchTopArtists")
        } else {
          console.log("No auth token")
          // If no token, initiate Spotify authorization
          initiateSpotifyAuth();
        }
    };

    const refreshSpotifyAccessToken = async () => {
      const currentUser = await getCurrentUser();
      // Ensure you're using the correct endpoint for your Lambda function
      const response = await axios.post('https://9kaizjbmk9.execute-api.us-east-1.amazonaws.com/dev/spotifytokenhandler-dev', {
        operation: 'refresh_access_token',
        username: currentUser.username
      });
    }

    const fetchTopArtists = async (token, range) => {
      console.log("Entering fetch")
      try {
        const response1 = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${range}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const response2 = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&offset=50&time_range=${range}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const combinedTopArtists = [...response1.data.items, ...response2.data.items];
        setTopArtists(combinedTopArtists);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Expired Token")
          refreshSpotifyAccessToken();
      } else {
        console.log("Error other than expired token")
      }
    };
  }



    checkForSpotifyAccessToken()
  }, [timeRange, isTokenRefreshing]);

  const handleTimeRangeSelection = (range) => {
    setTimeRange(range);
  };

  const isSelected = (range) => {
    return timeRange === range ? 'bg-gray-300' : 'bg-white';
  };

  return (
    <div className="mx-auto my-10 p-5 border-2 rounded h-2/3 w-96 flex flex-col" id="container">
      <h1 className="text-3xl font-bold pb-1 mb-2">Top 50 Artists</h1>
      <div className="flex border-2 mb-2">
        <div 
          className={`flex-grow border-r cursor-pointer p-2 ${isSelected('short_term')}`}
          onClick={() => handleTimeRangeSelection('short_term')}>
          4 Weeks
        </div>
        <div 
          className={`flex-grow border-r cursor-pointer p-2 ${isSelected('medium_term')}`}
          onClick={() => handleTimeRangeSelection('medium_term')}>
          6 Months
        </div>
        <div 
          className={`flex-grow cursor-pointer p-2 ${isSelected('long_term')}`}
          onClick={() => handleTimeRangeSelection('long_term')}>
          Lifetime
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <ul className="list-none">
          {topArtists.map((artist, index) => (
            <li key={artist.id} className="mb-2 p-2 border border-gray-200 rounded">
              {index + 1}. {artist.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicStatsPage;
