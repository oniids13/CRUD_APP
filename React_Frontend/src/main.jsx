import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import CreateItem from './pages/CreateItem';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="item/:id" element={<ItemDetail />} />
          <Route path="create-item" element={<CreateItem />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
