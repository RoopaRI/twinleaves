import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetails = () => {
  const { index } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (index) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products`, {
        params: { page: 1, pageSize: 10 }
      });
      const productData = response.data.products[index];
      setProduct(productData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(index);
  }, [index]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      {product && (
        <Card>
          <CardMedia
            component="img"
            alt={product.name}
            height="300"
            image={product.images.front}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetails;