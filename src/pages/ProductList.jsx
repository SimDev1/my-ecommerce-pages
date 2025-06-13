import { Grid, Container } from '@mui/material';
import ProductCard from '../components/ProductCard';


const dummyProducts = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'public/assets/product1.jpeg' },
  { id: 2, name: 'Product 2', price: 39.99, image: 'public/assets/product1.jpeg' },
  { id: 3, name: 'Product 3', price: 49.99, image: 'public/assets/product1.jpeg' },
];

const ProductList = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {dummyProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
