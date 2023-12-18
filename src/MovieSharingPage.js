import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth'; // Import getCurrentUser from aws-amplify/auth
import * as mutations from './graphql/mutations';

const MovieSharingPage = () => {
  // State to store movie details
  const [movie, setMovie] = useState({ title: '', description: '', addedBy: '' });

  // Create a new GraphQL client instance
  const client = generateClient();

  useEffect(() => {
    // This useEffect hook runs when the component mounts
    const fetchUser = async () => {
      try {
        // Get the current authenticated user from Cognito
        const user = await getCurrentUser();
        // Update the movie state with the user's username
        setMovie(prevState => ({ ...prevState, addedBy: user.username }));
      } catch (err) {
        // Log error if fetching the user fails
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);
//   useEffect(() => {
//     console.log(movie);
//   }, [movie]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the movie state when input fields change
    setMovie(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call GraphQL mutation to add the new movie
      const newMovie = await client.graphql({
        query: mutations.createMovie,
        variables: { input: movie }
      });
      console.log('Movie added:', newMovie);
      // Reset title and description after successful submission
      //setMovie({ title: '', description: '', addedBy: movie.addedBy });
    } catch (err) {
      // Log error if the mutation fails
      console.error('Error adding movie:', err);
    }
  };

  return (
    <div>
      <h1>Add a New Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={movie.description}
          onChange={handleChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieSharingPage;


// Schema
//
// export const createMovie = /* GraphQL */ `
//   mutation CreateMovie(
//     $input: CreateMovieInput!
//     $condition: ModelMovieConditionInput
//   ) {
//     createMovie(input: $input, condition: $condition) {
//       id
//       title
//       description
//       addedBy
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;