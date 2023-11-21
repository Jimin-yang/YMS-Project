import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const PaymentPage = ({ location }) => {
  const history = useHistory();
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
  let IMP; // IMP 모듈 전역 변수로 선언

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    script.onload = () => {
      const userCode = 'imp14397622';
      window.IMP.init(userCode);
      setImpLoaded(true); // 모듈이 로드되고 초기화됨을 나타내는 상태 변경
    };
    document.head.appendChild(script);
  
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  const requestPay = () => {
    if (!impLoaded) {
      alert('결제 모듈을 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }
  
    const amount = calculateTotalAmount(); // 총 결제 금액 계산
    window.IMP.request_pay({
      pg: 'kakaopay',
      pay_method: 'card',
      merchant_uid: 'test_lp8h3p60',
      name: '영화 표',
      amount: amount,
      buyer_tel: '012-3456-7890',
    }, (rsp) => {
      if (rsp.success) {
        history.push('/CompletePage');
      } else {
        alert('결제에 실패하였습니다.');
      }
    });
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