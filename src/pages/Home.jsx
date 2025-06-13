// Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h3">Welcome to Buyam</Typography>
        <Typography variant="subtitle1">Shop the latest products now!</Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 180, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ height: 40, overflow: 'hidden' }}>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#006400',
                      '&:hover': {
                        backgroundColor: '#004d00',
                      },
                      color: '#fff',
                      textTransform: 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added ${product.name} to cart`);
                    }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            No products found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
