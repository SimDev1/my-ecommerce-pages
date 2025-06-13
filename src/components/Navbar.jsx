import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Fade,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
  TextField,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Search as SearchIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useEffect, useRef, useState } from 'react';

const categoriesWithSub = {
  'Arts & Crafts': ['Painting', 'Drawing', 'Knitting'],
  Baby: ['Baby Food', 'Diapers', 'Toys'],
  'Beauty & Personal care': ['Makeup', 'Skincare', 'Hair Care'],
  Computers: ['Laptops', 'Desktops', 'Accessories'],
  Electronics: ['Phones', 'TVs', 'Audio'],
  Fashion: ['Men', 'Women', 'Accessories'],
  'Home & Kitchen': ['Furniture', 'Cookware', 'Bedding'],
  'Pet Supplies': ['Food', 'Toys', 'Grooming'],
  'Sports & Outdoor': ['Fitness', 'Camping', 'Cycling'],
  'Toys & Games': ['Educational', 'Board Games', 'Puzzles'],
  'Video games': ['PlayStation', 'Xbox', 'PC Games'],
};
const sortedCategories = Object.keys(categoriesWithSub).sort();

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [animateCart, setAnimateCart] = useState(false);
  const prevCart = useRef(cartCount);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');
  const navigate = useNavigate();

  // Animate cart icon on add
  useEffect(() => {
    if (cartCount > prevCart.current) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 500);
    }
    prevCart.current = cartCount;
  }, [cartCount]);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleExpand = (cat) => setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #ccff33, #99e600)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box component="img" src="/Buyam.png" alt="Buyam Logo" sx={{ height: 40, mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'orange', fontWeight: 'bolder' }}>
                Buyam
              </Typography>
            </Link>
          </Box>

          {!isMobile && (
            <Box component="form" onSubmit={handleSearchSubmit} sx={{ mr: 2, flexGrow: 1, maxWidth: 700 }}>
              <TextField
                size="small"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ background: 'white', borderRadius: 1 }}
              />
            </Box>
          )}

          {!isMobile && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
                Home
              </Button>

              {!user ? (
                <>
                  <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 'bold' }}>
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register" sx={{ fontWeight: 'bold' }}>
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/cart"
                    sx={{
                      ml: 1,
                      animation: animateCart ? 'shake 0.3s ease' : 'none',
                      '@keyframes shake': {
                        '0%': { transform: 'translateX(0)' },
                        '25%': { transform: 'translateX(-3px)' },
                        '50%': { transform: 'translateX(3px)' },
                        '75%': { transform: 'translateX(-3px)' },
                        '100%': { transform: 'translateX(0)' },
                      },
                    }}
                  >
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>

                  <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{user.email.charAt(0).toUpperCase()}</Avatar>
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} TransitionComponent={Fade}>
                    <MenuItem disabled>{user.email}</MenuItem>
                    <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleMenuClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 270 }} role="presentation">
          <Typography variant="h6" sx={{ m: 2 }}>
            Menu
          </Typography>
          <Divider />

          <List>
            {sortedCategories.map((category, idx) => (
              <Box key={idx}>
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => toggleExpand(category)}>
                      {expanded[category] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  }
                >
                  <ListItemText primary={category} />
                </ListItem>

                <Collapse in={expanded[category]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {categoriesWithSub[category].map((sub, subIdx) => (
                      <ListItemButton
                        key={subIdx}
                        sx={{ pl: 4 }}
                        component={Link}
                        to={`/category/${encodeURIComponent(category)}/${encodeURIComponent(sub)}`}
                      >
                        <ListItemText primary={sub} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}

            <Divider sx={{ my: 1 }} />

            <ListItemButton component={Link} to="/">
              Home
            </ListItemButton>
            <ListItemButton component={Link} to="/products">
              Products
            </ListItemButton>

            {!user ? (
              <>
                <ListItemButton component={Link} to="/login">
                  Login
                </ListItemButton>
                <ListItemButton component={Link} to="/register">
                  Register
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton component={Link} to="/cart">
                  Cart
                </ListItemButton>
                <ListItemButton component={Link} to="/profile">
                  Profile
                </ListItemButton>
                <ListItemButton onClick={logout}>Logout</ListItemButton>
              </>
            )}
          </List>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ px: 2, py: 1 }}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                size="small"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
