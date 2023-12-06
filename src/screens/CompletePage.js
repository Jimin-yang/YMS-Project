import React from 'react';
import { Typography } from '@material-ui/core';
import cgvImage from './cgvimg1.png'; // 이미지 파일 경로

const CompletePage = ({ location }) => {
  const {
    movieTitle,
    theater,
    time,
    selectedSeats,
    childCount,
    adultCount,
    merchantUid,
  } = location.state || {};

  return (
    <div style={{ backgroundImage: `url(${cgvImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'rgba(255, 182, 193, 1)', padding: '40px', borderRadius: '10px', width: '40%', textAlign: 'center', height: '40%' }}>
        <Typography variant="h5" gutterBottom>
          영수증
        </Typography>
        <Typography variant="body1" paragraph>
          결제 코드: {merchantUid}
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
          선택 좌석: {selectedSeats ? selectedSeats.join(', ') : '선택된 좌석이 없습니다.'}
        </Typography>
        <Typography variant="body1" paragraph>
          어린이: {childCount}명
        </Typography>
        <Typography variant="body1" paragraph>
          성인: {adultCount}명
        </Typography>
      </div>
    </div>
  );
};

export default CompletePage;
