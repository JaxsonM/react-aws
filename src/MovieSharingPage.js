import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMovie } from './graphql/mutations'; // Ensure the path is correct

const AddMoviePage = () => {
  const [movie, setMovie] = useState({ title: '', description: '', addedBy: '' });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!movie.title || !movie.addedBy) {
        alert('Please fill in all fields');
        return;
      }
      const movieData = await API.graphql(graphqlOperation(createMovie, { input: movie }));
      console.log('Movie added:', movieData);
      setMovie({ title: '', description: '', addedBy: '' });
      alert('Movie added successfully');
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Error adding movie');
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
        <input
          type="text"
          name="addedBy"
          placeholder="Your Name"
          value={movie.addedBy}
          onChange={handleChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMoviePage;
