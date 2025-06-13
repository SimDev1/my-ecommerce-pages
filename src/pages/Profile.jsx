import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Avatar,
  Grid,
} from '@mui/material';
import { useState } from 'react';

const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United States', 'United Kingdom'];

const Profile = () => {
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    location: '',
    country: '',
    profilePic: null,
    previewPic: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        profilePic: file,
        previewPic: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fullName', form.fullName);
    data.append('gender', form.gender);
    data.append('location', form.location);
    data.append('country', form.country);
    data.append('profilePic', form.profilePic);

    try {
      const res = await fetch('/api/users/complete-profile', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      alert('Profile completed successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Complete Your Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          {/* LEFT - Profile Picture */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                src={form.previewPic}
                sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
              />
              <Button variant="contained" component="label">
                Upload Picture
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Box>
          </Grid>

          {/* RIGHT - Form Fields */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Country of Residence"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large" fullWidth>
                  Submit Profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
