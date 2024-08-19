// src/pages/CreateItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api';

function CreateItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any fields are empty
    if (!name || !description || !price) {
      setError('All fields are required');
      return;
    }

    try {
      const newItem = { name, description, price };
      const response = await createItem(newItem);

      if (response.response.Success) {
        alert('Item Created Successfully');
        navigate('/');
      } else {
        setError('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Failed to create item');
    }
  };

  return (
    <div>
      <h2>Create New Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}

export default CreateItem;
