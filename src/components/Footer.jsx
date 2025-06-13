import { Box, Container, IconButton, Typography } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(90deg, #ccff33, #99e600)',
        py: 3,
        mt: 5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/anyanwu-simeon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </IconButton>

          <IconButton
            component="a"
            href="mailto:your.simeonanyanwu00@gmail.com"
            aria-label="Gmail"
          >
            <Email />
          </IconButton>

          <IconButton
            component="a"
            href="https://github.com/simdev1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHub />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center">
          &copy; SimDev {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
