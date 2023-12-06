import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

const CompletePage = ({ location }) => {
  const history = useHistory();
  const selectedMovie = location.state?.selectedMovie || {
    movieTitle: 'Unknown Movie',
    theater: 'Unknown Theater',
    time: 'Unknown Time',
    selectedSeats: [],
    totalAmount: 0,
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      history.push('/');
    }, 15000);

    return () => {
      clearTimeout(timerId);
    };
  }, [history]);

  const renderMovieInfo = (label, value) => (
    <Typography variant="body1" gutterBottom>
      {label}: {value}
    </Typography>
  );

  return (
    <Box textAlign="center" mt={10} onClick={() => history.push('/')}>
      <Typography variant="h4" gutterBottom>
        Payment Complete
      </Typography>
      <Typography variant="h6" gutterBottom>
        Thank you for your purchase!
      </Typography>
      <Box mt={4}>
        {renderMovieInfo('Movie', selectedMovie.movieTitle)}
        {renderMovieInfo('Theater', selectedMovie.theater)}
        {renderMovieInfo('Time', selectedMovie.time)}
        {renderMovieInfo('Selected Seats', selectedMovie.selectedSeats.join(', '))}
        {renderMovieInfo('Total Amount', selectedMovie.totalAmount)}
      </Box>
    </Box>
  );
};

export default CompletePage;
