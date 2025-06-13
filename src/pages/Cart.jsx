import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', quantity: 1, price: 29.99 },
    { id: 2, name: 'Product 2', quantity: 2, price: 39.99 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Shopping Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} x${item.quantity}`}
              secondary={`$${(item.price * item.quantity).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Proceed to Checkout</Button>
    </Container>
  );
};

export default Cart;
