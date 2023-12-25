import React, { useState } from 'react';

const AddMovieForm = ({ onAddMovie, groupId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddMovie(groupId, { title, description });
      setTitle('');
      setDescription('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Movie</button>
      </form>
    );
  };

export default AddMovieForm;
  