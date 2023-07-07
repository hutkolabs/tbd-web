import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h1">Not Found Page</Typography>

      <Link to="/">Go to Home Page</Link>
    </Box>
  );
};
