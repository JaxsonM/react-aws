import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = '00ed30d4fa214614be034225cd52f0fb';
const REDIRECT_URI = encodeURIComponent('https://main.d2s8qhdd2t59ja.amplifyapp.com/callback');
const AUTH_SCOPES = ['user-top-read'];
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${AUTH_SCOPES.join('%20')}&response_type=token&show_dialog=true`;

const MusicStatsPage = () => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('spotifyAuthToken');  // Retrieve the token

    if (token) {
        fetchTopArtists(token);
    } else {
        window.location.href = SPOTIFY_AUTH_URL;  // Redirect to Spotify login
    }
}, []);

  const fetchTopArtists = (token) => {
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=10', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setTopArtists(response.data.items);
    })
    .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Top 10 Artists</h1>
      <ul>
        {topArtists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MusicStatsPage;
