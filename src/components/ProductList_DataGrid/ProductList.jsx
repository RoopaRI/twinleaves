import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, CircularProgress, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  // const navigate = useNavigate();

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products`, {
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

  const handlePageChange = (params) => {
    setPage(params.page + 1);
  };

  const columns = [
    {
      field: 'product',
      headerName: 'Product',
      flex: 1,
      renderCell: (params) => {
        return (
            <div style={{  display: 'flex', flexDirection: 'row'}}>
            <Card>
              <CardMedia
                component="img"
                alt={params.row.name}
                height="200"
                image={params.row.image || 'https://pluspng.com/img-png/onion-png-onion-png-image-788.png'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {params.row.brand}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={() => navigate(`/products/${params.row.id}`)}
                >
                  ADD
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
        rowHeight={550}
          rows={products}
          columns={columns}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          rowCount={totalPages * pageSize}
          paginationMode="server"
          getRowId={(row) => row.name} // Use 'id' as the unique identifier
        />
      )}
    </Container>
  );
};

export default ProductList;
