import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api';

function CreateItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem({ name, description, price });
    alert('Item Created');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Item</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateItem;
