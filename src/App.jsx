// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
//import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Category from './pages/Category';

import { Box } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Full height flex container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar />

          {/* Main content that grows to fill available space */}
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
