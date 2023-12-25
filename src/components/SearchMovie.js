import React, { useState } from 'react';
import axios from 'axios';

const SearchMovie = ({onMovieSelected}) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState('');

  const OMDB_API_KEY = '6032dbdb';

  const handleSearch = async () => {
    setError('');
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search); // Set the movies if found
        setQuery(''); // Clear the query after successful search
      } else {
        setError(response.data.Error); // Set the error message if no movies are found
        setMovies([]); // Clear any previous movies
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setMovies([]);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie); // Save the selected movie details
    setMovies([]); // Clear the search results

    // Call the onMovieSelected callback, passing the selected movie
    onMovieSelected(movie);
};

return (
    <div className="border-2 p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Movie</h1>
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter a movie name" 
          className="flex-grow p-2 border rounded"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
  
      {error && <p className="text-red-500">{error}</p>}
  
      <div className="space-y-4">
        {movies.length > 0 ? (
          movies.slice(0, 5).map(movie => ( // Only map through the first 5 movies
            <div 
              key={movie.imdbID} 
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectMovie(movie)}
            >
              <h2 className="text-xl font-semibold">{movie.Title}</h2>
              <p>{movie.Year}</p>
              {/* Display a brief summary or other data */}
            </div>
          ))
        ) : !error && <p>No movies to display. Start searching above!</p>}
      </div>
    </div>
  );  
};

export default SearchMovie;
