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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setSnackbar({ open: true, message: 'All fields are required', severity: 'error' });
    }

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password
      });

      // If success
      setSnackbar({ open: true, message: 'Registration successful! Please login.', severity: 'success' });
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
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
          Register
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
            {loading ? 'Registering...' : 'Register'}
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

export default Register;
