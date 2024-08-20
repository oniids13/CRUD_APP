// src/pages/CreateItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api';
import { Link } from "react-router-dom";

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
    <div className='create-item'>
      <h2>Create New Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='create-form' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
        </div>
        <button className='btn-create' type="submit">Create Item</button>
        <div className='back' >
            <Link to="/">Back</Link>
            </div>
      </form>
    </div>
  );
}

export default CreateItem;
