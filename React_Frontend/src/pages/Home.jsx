import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../api';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();
      setItems(data.item);
    };
    getItems();
  }, []);

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
