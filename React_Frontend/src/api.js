const API_URL = 'http://localhost:5000/api/items';

export const fetchItems = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const fetchItem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createItem = async (item) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(item),
  });
  return response.json();
};


export const updateItem = async (id, item) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();  // Return the response JSON
    } catch (error) {
      console.error('Error updating item:', error);
      return { Success: 'Failed to update item' };  // Consistent error structure
    }
  };
  
  
  

export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
