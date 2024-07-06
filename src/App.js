import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductList from './components/ProductList_DataGrid/ProductList';
// import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetail/ProductDetail';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products?page=id" element={<ProductDetails />} />
      </Routes>
    </Router>

    // <Home />
    
    
    
  );
};

export default App;