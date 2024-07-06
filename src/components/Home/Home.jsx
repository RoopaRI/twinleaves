import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {Stack} from "@mui/material";
import Category from '../Category/Category';
// import ProductList from '../ProductList_DataGrid/ProductList';
import ProductList from '../ProductList/ProductList';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10); // You can adjust the page size as needed
    const [totalPages, setTotalPages] = useState(0);
  
    const fetchData = async (page = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const response = await axios.get('https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products', {
          params: { page, pageSize },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData(page, pageSize);
    }, [page, pageSize]);
  
    const handleSearch = async (term) => {
      setSearchTerm(term);
      setPage(1); // Reset page to 1 when search term changes

      setLoading(true);
      try {
        const response = await axios.get('https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products', {
          params: { page: 1, pageSize, search: term },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching filtered data:', error);
        setLoading(false);
      }
    };
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      // Implement logic to filter products based on category
    };
  
    const handleSortChange = (order) => {
      setSortOrder(order);
      // Implement logic to sort products based on order (asc/desc)
    };
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    return (
      <Stack direction="row" spacing={2}>
        <div style={{ flex: 2 }}>
          <Category
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />
        </div>
  
        <div style={{ flex: 10 }}>
          <ProductList
            products={products}
            loading={loading}
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
          />
        </div>
      </Stack>
    );
  }
  
  