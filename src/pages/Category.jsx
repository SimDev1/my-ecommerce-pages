import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const Category = () => {
  const { categoryName } = useParams();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products in Category: {decodeURIComponent(categoryName)}
      </Typography>

      {/* TODO: Replace this with actual product fetching logic */}
      <Typography variant="body1">
        Here you would display all products related to "{decodeURIComponent(categoryName)}".
      </Typography>
    </Container>
  );
};

export default Category;
