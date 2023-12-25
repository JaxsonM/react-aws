import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createMovie } from '../../graphql/mutations';
import { moviesByGroupIdAndTitle } from '../../graphql/queries';
import AddMovieForm from './AddMovieForm';
import SearchMovie from '../../components/SearchMovie'
import { generateClient } from 'aws-amplify/api';
import useCurrentUser from '../../hooks/useCurrentUser';

const MovieGroupPage = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
  const groupId = location.state?.groupId;
  const groupMembers = location.state?.members;
  const currentUser = useCurrentUser();
  const fetchMoviesForGroup = async () => {
        if (groupId) {
          const client = generateClient();
          try {
            const result = await client.graphql({
              query: moviesByGroupIdAndTitle,
              variables: { groupId }
            });
            setMovies(result.data.moviesByGroupIdAndTitle.items);
          } catch (error) {
            console.error(`Error fetching movies for group ${groupId}:`, error);
          }
        }
      };
    useEffect(() => {
      fetchMoviesForGroup();
    }, [groupId]);

    const addMovieToGroup = async (movieDetails) => {
        const client = generateClient();
        try {
          await client.graphql({
            query: createMovie,
            variables: { input: movieDetails }
          });
          fetchMoviesForGroup();
        } catch (error) {
          console.error("Error adding movie to group:", error);
        }
      };

      const handleMovieSelected = async (selectedMovie) => {
        await addMovieToGroup({
          title: selectedMovie.Title,
          year: selectedMovie.Year,
          type: selectedMovie.Type,
          poster: selectedMovie.Poster,
          imdbID: selectedMovie.imdbID,
          groupId: groupId,
          // Assuming 'addedBy' is the username of the user adding the movie
          addedBy: currentUser.username // Replace 'username' with actual username variable if available
        });
      };

      return (
        <div className="flex">
            <div className="w-1/3">
            <div className="border m-1">Pick Movie</div>
            <div className="border m-1">
                <h2>Members</h2>
            <p>{groupMembers.join(', ')}</p>
            </div>
        <div className="m-1">
            <SearchMovie onMovieSelected={handleMovieSelected} />
        </div>
        </div>
        <div className="w-2/3 bg-white shadow overflow-hidden sm:rounded-lg px-4 m-1 h-[calc(100vh-6rem)] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 sticky top-0 bg-white">Movies in this Group:</h3>
            {
            movies.length > 0 ? (
                <ul className="space-y-4 pb-4">
                {movies.map(movie => (
                    <li key={movie.id} className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                    <img src={movie.poster} alt={`${movie.title} poster`} className="w-24 h-auto rounded shadow" />
                    <div className="flex-grow">
                        <h4 className="text-lg font-semibold">{movie.title}</h4>
                        <p className="text-sm text-gray-600">Year: {movie.year}</p>
                        <p className="text-sm text-gray-600">Added By: {movie.addedBy}</p>
                    </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-gray-600">No movies in this group yet.</p>
            )
            }
        </div>
        </div>

      );
    };

export default MovieGroupPage;
