import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Stack } from "@mui/material";

export default function Category({ onSearch, onCategoryChange, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Callback to parent component to handle search
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    onCategoryChange(event.target.value); // Callback to parent component to handle category filter
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onSortChange(event.target.value); // Callback to parent component to handle sort order
  };

  return (
    <Stack direction="column" spacing={10}>
      <FormControl fullWidth>
      {/* <InputLabel htmlFor="search-input">Search by product name</InputLabel> */}
        <input
          id="search-input"
          type="text"
          placeholder="Search by Product name"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{marginTop:'20px', marginLeft:'10px'}}
        />
        
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="category-label">Filter by category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
          style={{ marginLeft:'10px'}}
          
        >
          <MenuItem value="" >All Categories</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="Biscuits">biscuits & cookies</MenuItem>
          <MenuItem value="clothing"></MenuItem>
          
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort by price</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortOrder}
          onChange={handleSortChange}
          style={{ marginLeft:'10px'}}
        >
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
