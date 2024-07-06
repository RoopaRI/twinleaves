import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products/page=${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        product && (
          <>
            <Typography variant="h4">{product.brand}</Typography>
            <img src={product.image} alt={product.name} style={{ height: '200px' }} />
            <Typography variant="h6">Price: {product.price}</Typography>
            <Typography variant="body1">{product.description}</Typography>
          </>
        )
      )}
    </Container>
  );
};

export default ProductDetails;
