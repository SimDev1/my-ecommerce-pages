// ProductDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box>
        <img
          src={product.image}
          alt={product.name}
          width="100%"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
        <Typography variant="h4" sx={{ mt: 2 }}>{product.name}</Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Typography sx={{ mt: 1 }}>{product.description}</Typography>
        <Button variant="contained" sx={{ mt: 2 }}>Add to Cart</Button>
      </Box>
    </Container>
  );
};

export default ProductDetail;
