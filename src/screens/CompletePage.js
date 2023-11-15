/* 
11/15 
useEffect, setTimeout 함수 -> useCallback, useRef 으로 변경
*/


import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

const CompletePage = ({ location }) => {
  const history = useHistory();
  const movieTitle = location.state?.movieTitle || 'Unknown Movie';
  const theater = location.state?.theater || 'Unknown Theater';
  const time = location.state?.time || 'Unknown Time';
  const selectedSeats = location.state?.selectedSeats || [];
  const totalAmount = location.state?.totalAmount || 0;

  const handleClick = useCallback(() => {
    history.push('/');
  }, [history]);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      history.push('/');
    }, 15000); // 15초 후에 홈페이지로 이동

    return () => clearTimeout(timerRef.current); // 컴포넌트가 언마운트되면 타이머를 제거합니다.
  }, [history]);

  const renderMovieInfo = (label, value) => (
    <Typography variant="body1" gutterBottom>
      {label}: {value}
    </Typography>
  );

  return (
    <Box textAlign="center" mt={10} onClick={handleClick}>
      <Typography variant="h4" gutterBottom>
        Payment Complete
      </Typography>
      <Typography variant="h6" gutterBottom>
        Thank you for your purchase!
      </Typography>
      <Box mt={4}>
        {renderMovieInfo('Movie', movieTitle)}
        {renderMovieInfo('Theater', theater)}
        {renderMovieInfo('Time', time)}
        {renderMovieInfo('Selected Seats', selectedSeats.join(', '))}
        {renderMovieInfo('Total Amount', totalAmount)}
      </Box>
    </Box>
  );
};

export default CompletePage;