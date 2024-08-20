// src/pages/ItemDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItem, updateItem, deleteItem } from '../api';
import { Link } from "react-router-dom";

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
    <div className='item-detail-container'>
      {item ? (
        <>
          <div>
            <h1>{item.name}</h1>
            <p>Description: {item.description}</p>
            <p>Price: ₱{item.price}</p>
            <button className='btn-update' onClick={() => setIsEditing(true)}>Update</button>
            <button className='btn-delete' onClick={handleDelete}>Delete</button>
            <div className='back' >
            <Link to="/">Back</Link>
            </div>
          </div>

          {isEditing && (
            <div>
              <form onSubmit={handleUpdate}>
                <h2>Update Item</h2>
                  <div className="item-detail-form">
                    <div>
                      <label htmlFor="name">Name</label>
                      <input
                        id='name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="desc">Description</label>
                      <input
                        id='desc'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price</label>
                      <input
                        id='price'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                      />
                    </div>
                  </div>
                <button className='btn-save' type="submit">Save Changes</button>
                <button className='btn-cancel' type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetail;
