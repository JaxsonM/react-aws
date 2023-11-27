import React, { useState } from 'react';
import axios from 'axios';

const MovieRaterPage = () => {
  const [query, setQuery] = useState('');
  const [movieData, setMovieData] = useState(null);

  const OMDB_API_KEY = '6032dbdb';

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${query}&apikey=${OMDB_API_KEY}`);
      setMovieData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovieData(null);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter a movie name" 
      />
      <button onClick={handleSearch}>Search</button>

      {movieData && (
        <div>
          <h2>{movieData.Title}</h2>
          <p>{movieData.Plot}</p>
          {/* Display other movie data as needed */}
        </div>
      )}
    </div>
  );
};

export default MovieRaterPage;
