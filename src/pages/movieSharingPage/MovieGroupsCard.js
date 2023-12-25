import React, { useState, useEffect } from 'react';
import { createMovie } from '../../graphql/mutations';
import { moviesByGroupIdAndTitle } from '../../graphql/queries';
import AddMovieForm from './AddMovieForm';
import { generateClient } from 'aws-amplify/api';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const MovieGroupsCard = ({ movieGroups }) => {
  const [moviesByGroup, setMoviesByGroup] = useState({});

  useEffect(() => {
    const fetchMoviesForGroups = async () => {
      const client = generateClient();
      const newMoviesByGroup = {};

      for (const group of movieGroups) {
        try {
          const result = await client.graphql({
            query: moviesByGroupIdAndTitle,
            variables: { groupId: group.id }
          });
          newMoviesByGroup[group.id] = result.data.moviesByGroupIdAndTitle.items;
        } catch (error) {
          console.error(`Error fetching movies for group ${group.id}:`, error);
        }
      }

      setMoviesByGroup(newMoviesByGroup);
    };

    fetchMoviesForGroups();
  }, [movieGroups]);

  const addMovieToGroup = async (groupId, movie) => {
    const client = generateClient();
    try {
      const result = await client.graphql({
        query: createMovie,
        variables: { input: { ...movie, groupId } }
      });
      // Handle the result, such as updating the local state to reflect the new movie
    } catch (error) {
      console.error("Error adding movie to group:", error);
      // Handle error
    }
  };

  return (
    <div className="card-style">
      {movieGroups.length > 0 ? (
        <div className="card-content">
          {movieGroups.map(group => (
            <li className="card-item" key={group.id}>
              <Link to="/movie-group" state={{ groupId: group.id, members: group.members }}>
                Group: {group.id}
              </Link>
              <p>Members: {group.members.join(', ')}</p>
            </li>
          ))}
        </div>
      ) : (
        <p>You are not part of any movie groups yet.</p>
      )}
    </div>
  );
};
export default MovieGroupsCard;