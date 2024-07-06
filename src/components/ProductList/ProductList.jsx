import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, CircularProgress, Card, CardContent, CardMedia, Typography, Container, Pagination, Box, MenuItem, Select } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductList({ searchTerm, selectedCategory, sortOrder }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10); // You can adjust the page size as needed
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
  
    const fetchData = async (page = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const params = { page, pageSize };
        if (searchTerm) params.search = searchTerm;
        if (selectedCategory) params.category = selectedCategory;
        if (sortOrder) params.sort = sortOrder;
  
        const response = await axios.get('https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products', { params });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages); // Assuming the API response includes total pages
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = queryParams.get('page');
        const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
        setPage(initialPage);
        fetchData(initialPage, pageSize);
      }, [location.search, pageSize, searchTerm, selectedCategory, sortOrder]);
  
    const handlePageChange = (event, value) => {
      setPage(value);
      navigate(`${location.pathname}?page=${value}`);
    };
  
    if (loading) {
      return <CircularProgress />;
    }
  
    return (
      <Container>
        <Grid container spacing={4}>
          {products.map((ele) => (
            <Grid item xs={12} sm={6} md={4} key={ele.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={ele.name}
                  height="140"
                  image={ele.images.front || 'https://pluspng.com/img-png/onion-png-onion-png-image-788.png'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.brand}
                  </Typography>
  
                  <Select
                    labelId="demo-select-label"
                    id="demo-select"
                    value={10} // Set the initial value
                    label="Select weight (kg)"
                    style={{ width: '100%' }}
                  >
                    <MenuItem value={10}>1kg-5kg</MenuItem>
                    <MenuItem value={20}>5kg-10kg</MenuItem>
                    <MenuItem value={30}>10kg-20kg</MenuItem>
                  </Select>
  
                  <Typography gutterBottom variant="p" component="div">
                    Standard Delivery: Tomorrow 9:00AM - 1:30PM
                  </Typography>
  
                  <Box style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <Box>
                      <label htmlFor="quantity">qty</label>
                      <input variant="outlined" id="quantity" value="1" style={{ width: 50, height: 30, textAlign: 'center' }}></input>
                    </Box>
  
                    <Button variant="contained" color="primary" onClick={() => navigate(`/products?page=${ele.id}`)}>
                      ADD
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
        />
      </Container>
    );
  }
  