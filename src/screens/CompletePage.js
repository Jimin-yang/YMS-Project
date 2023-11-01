import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

const CompletePage = ({ location }) => {
  const history = useHistory();
  const movieTitle = location.state?.movieTitle || 'Unknown Movie';
  const theater = location.state?.theater || 'Unknown Theater';
  const time = location.state?.time || 'Unknown Time';
  const selectedSeats = location.state?.selectedSeats || [];
  const totalAmount = location.state?.totalAmount || 0;

  const handleClick = () => {
    history.push('/');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 15000); // 15초 후에 홈페이지로 이동

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거합니다.
  }, [history]);

  return (
    <Box textAlign="center" mt={10} onClick={handleClick}>
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