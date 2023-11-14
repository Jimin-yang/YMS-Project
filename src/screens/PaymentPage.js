import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

const PaymentPage = ({ location }) => {
  const {
    movieTitle,
    theater,
    time,
    selectedSeats,
    childCount,
    adultCount,
  } = location.state || {};

  // 가격 정보
  const childPrice = 8000;
  const adultPrice = 10000;

  // 상영관에 따라 가격을 계산하는 함수
  const calculateTotalAmount = () => {
    console.log('Theater:', theater);
    const childTotal = childPrice * (childCount || 0);
    const adultTotal = adultPrice * (adultCount || 0);
    const totalCount = childCount + adultCount;
    
    const theaterNumber = parseInt(theater.slice(-1), 10); // 문자열 끝에서 숫자만 추출하여 theaterNumber에 저장
    
    if (theaterNumber === 3) {
      console.log('Theater is 3');
      return childTotal + adultTotal + (8000 * totalCount);
    } else {
      console.log('Theater is not 3');
      return childTotal + adultTotal;
    }
  };

  const [impLoaded, setImpLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    script.onload = () => setImpLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const requestPay = () => {
    if (!window.IMP) {
      alert('결제 모듈을 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }

    const IMP = window.IMP;
    const userCode = 'imp14397622';
    IMP.init(userCode);

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'test_loxnlelx',
        name: '영화 표',
        amount: calculateTotalAmount(),
        buyer_tel: '010-0000-0000',
      },
      (rsp) => {
        if (rsp.success) {
          alert('결제가 완료되었습니다.');
        } else {
          alert('결제에 실패하였습니다.');
        }
      }
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        최종 선택 정보
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
      <Button variant="contained" color="primary" onClick={requestPay}>
        결제하기
      </Button>
    </div>
  );
};

export default PaymentPage;