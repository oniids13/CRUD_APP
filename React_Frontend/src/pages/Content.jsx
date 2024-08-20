import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateItem from './CreateItem';
import ItemDetail from './ItemDetail';
// import Login from './Login';

function Content() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-item" element={<CreateItem />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </main>
  );
}

export default Content;
