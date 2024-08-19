import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateItem from './pages/CreateItem';
import ItemDetail from './pages/ItemDetail';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/create-item">Create Item</Link>
              </li>
          </ul>
        </nav>
      </header>

      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/create-item" element={<CreateItem />} />
          </Routes>
        </main>

      <footer className="App-footer">
        <p>&copy; 2024 Your Company Name</p>
      </footer>
    </div>
  );
}

export default App;
