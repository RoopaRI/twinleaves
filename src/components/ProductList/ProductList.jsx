import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, CircularProgress, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products`);
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                image={ele.images || 'https://pluspng.com/img-png/onion-png-onion-png-image-788.png'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {ele.brand}
                </Typography>
                <Button variant="contained" color="primary">
                  ADD
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
