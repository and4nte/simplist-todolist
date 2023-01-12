import { Box, Typography } from '@mui/material';

function About() {
  return (
    <Box>
      <Typography
        component="h1"
        sx={{
          fontFamily: 'Dongle',
          fontSize: '10rem',
        }}
      >
        about? 어바웃!
      </Typography>
      <Box />
    </Box>
  );
}

export default About;
