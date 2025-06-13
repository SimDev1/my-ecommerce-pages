import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia component="img" height="200" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/product/${product.id}`} size="small">View</Button>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;