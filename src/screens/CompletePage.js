import React from 'react';
import { Box, Typography } from '@material-ui/core';

const CompletePage = ({ location }) => {
  const movieTitle = location.state?.movieTitle || 'Unknown Movie';
  const theater = location.state?.theater || 'Unknown Theater';
  const time = location.state?.time || 'Unknown Time';
  const selectedSeats = location.state?.selectedSeats || [];
  const totalAmount = location.state?.totalAmount || 0;

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" gutterBottom>
        Payment Complete
      </Typography>
      <Typography variant="h6" gutterBottom>
        Thank you for your purchase!
      </Typography>
      <Box mt={4}>
        <Typography variant="body1" gutterBottom>
          Movie: {movieTitle}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Theater: {theater}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Time: {time}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Selected Seats: {selectedSeats.join(', ')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Amount: {totalAmount}
        </Typography>
      </Box>
    </Box>
  );
};

export default CompletePage;
