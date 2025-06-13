import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Snackbar,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setSnackbar({ open: true, message: 'All fields are required', severity: 'error' });
    }

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Example backend response: { token, user: { id, email, name } }
      const { token, user } = response.data;

      // Save token to localStorage for later use
      localStorage.setItem('token', token);

      // Set user in AuthContext
      login(user);

      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 8,
          background: 'linear-gradient(90deg, #ccff33 0%, #99e600 100%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#333' } }}
            InputProps={{ style: { backgroundColor: '#fff', borderRadius: 4 } }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#333' } }}
            InputProps={{
              style: { backgroundColor: '#fff', borderRadius: 4 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box display="flex" justifyContent="flex-end" my={1}>
            <Link to="/forgot-password" style={{ textDecoration: 'underline', color: '#333' }}>
              Forgot Password?
            </Link>
          </Box>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              mt: 2,
              background: '#333',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                background: '#555'
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Login;
