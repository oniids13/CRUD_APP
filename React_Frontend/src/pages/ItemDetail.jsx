// src/pages/ItemDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItem, updateItem, deleteItem } from '../api';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getItem = async () => {
      const data = await fetchItem(id);
      setItem(data.item);
      setName(data.item.name);
      setDescription(data.item.description);
      setPrice(data.item.price);
    };
    getItem();
  }, [id]);

  const handleDelete = async () => {
    await deleteItem(id);
    alert('Item Deleted');
    navigate('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedItem = { name, description, price };

    try {
      const response = await updateItem(id, updatedItem);

      if (response.response.Success) {
        alert('Item Updated');
        setItem({ ...item, name, description, price });  // Update state
        setIsEditing(false);  // Close form
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  return (
    <div>
      {item ? (
        <>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>₱{item.price}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Update</button>

          {isEditing && (
            <form onSubmit={handleUpdate}>
              <h2>Update Item</h2>
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
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetail;
