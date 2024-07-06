import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetail/ProductDetail';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:index" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
