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

  // Destructure the selectedMovie object to get its properties
  const {
    movieTitle,
    theater,
    time,
    selectedSeats,
    childCount,
    adultCount,
    totalAmount, // Make sure totalAmount is a property of selectedMovie
  } = selectedMovie;

  // Assuming you have this function defined somewhere
  const calculateTotalAmount = () => {
    // Implement the logic to calculate the total amount
    // ...

    return totalAmount; // Make sure to return the calculated totalAmount
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
    <div>
      <Typography variant="h5" gutterBottom>
        최종 선택 정보
      </Typography>
      {/* Use the defined variables here */}
      <Typography variant="body1" paragraph>
        결제 코드: {selectedMovie.merchantUid} {/* Assuming merchantUid is a property of selectedMovie */}
      </Typography>
      <Typography variant="body1" paragraph>
        영화: {movieTitle}
      </Typography>
      <Typography variant="body1" paragraph>
        상영관: {theater}
      </Typography>
      <Typography variant="body1" paragraph>
        상영시간: {time}
      </Typography>
      <Typography variant="body1" paragraph>
        선택 좌석: {selectedSeats.join(', ')}
      </Typography>
      <Typography variant="body1" paragraph>
        어린이: {childCount}명, 성인: {adultCount}명
      </Typography>
      <Typography variant="body1" paragraph>
        지불 금액: {calculateTotalAmount()}원
      </Typography>
    </div>
  );
};

export default CompletePage;
