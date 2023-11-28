/*
11/15
 Dialog 컴포넌트에서 사용하는 Button 컴포넌트를 변수로 선언

 */


 import React, { useState, useEffect } from 'react';
 import './SeatSelectionPage.css';
 import { useLocation, useHistory } from 'react-router-dom';
 import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
 } from '@material-ui/core';
 
 const CinemaSeat = () => {
   const TOTAL_SEATS = 30;
   const [selectedSeats, setSelectedSeats] = useState([]);
   const [movieTitle, setMovieTitle] = useState('Unknown Movie');
   const [theater, setTheater] = useState('Unknown Theater');
   const [time, setTime] = useState('Unknown Time');
   const [totalPersons, setTotalPersons] = useState(0);
   const [childCount, setChildCount] = useState(0);
   const [adultCount, setAdultCount] = useState(0);
   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
   const [seats, setSeats] = useState([]);
 
   const location = useLocation();
   const history = useHistory();
   const { movieTitle: selectedMovieTitle, theater: selectedTheater, time: selectedTime } = location.state || {};

   useEffect(() => {
    fetch('/api/seats')
      .then(response => response.json())
      .then(data => setSeats(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (seats) {
      setSelectedSeats(seats);
    }
    if (selectedMovieTitle) {
      setMovieTitle(selectedMovieTitle);
    }
    if (selectedTheater) {
      setTheater(selectedTheater);
    }
    if (selectedTime) {
      setTime(selectedTime);
    }
  }, [seats, selectedMovieTitle, selectedTheater, selectedTime]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleConfirmClick = () => {
    const selectedCount = selectedSeats.length;
    setTotalPersons(selectedCount);

    let initialChildCount = 0;
    let initialAdultCount = selectedCount;

    if (selectedCount > 0) {
      initialChildCount = 1;
      initialAdultCount = selectedCount - 1;
    }

    setChildCount(initialChildCount);
    setAdultCount(initialAdultCount);
    setIsConfirmationOpen(true);
  };

  const handleChildCountChange = (count) => {
    setChildCount(count);
    setAdultCount(totalPersons - count);
  };

  const handleAdultCountChange = (count) => {
    setAdultCount(count);
    setChildCount(totalPersons - count);
  };

  const handleConfirmationButtonClick = () => {
    handlePaymentPageNavigation();
    setIsConfirmationOpen(false);
  };

  const handlePaymentPageNavigation = () => {
    history.push('/PaymentPage', {
      movieTitle,
      theater,
      time,
      selectedSeats,
      childCount,
      adultCount,
      totalPersons,
    });
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const renderSeat = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);
    return (
      <div
        key={seatNumber}
        className={`seat ${isSelected ? 'selected' : ''}`}
        onClick={() => handleSeatClick(seatNumber)}
      >
        {isSelected ? 'X' : seatNumber}
      </div>
    );
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= TOTAL_SEATS; i++) {
      seats.push(renderSeat(i));
    }
    return seats;
  };

  const renderPersonButtons = (type) => {
    const buttons = [];
    for (let i = 0; i <= totalPersons; i++) {
      const isSelected = type === 'child' ? childCount === i : adultCount === i;
      buttons.push(
        <Button
          key={`${type}-${i}`}
          className={`${type}-button ${isSelected ? 'selected' : ''}`}
          onClick={() => type === 'child' ? handleChildCountChange(i) : handleAdultCountChange(i)}
        >
          {i}명
        </Button>
      );
    }
    return buttons;
  };

  const confirmationButton = <Button onClick={handleConfirmationButtonClick} color="primary">확인</Button>;

  return (
    <div className="seat-selection-container">
      <h1>좌석 선택</h1>
      <p>Active selection: {movieTitle} - {theater} - {time}</p>
      <div className="seat-container">{renderSeats()}</div>
      <div className="button-container">
        <button className="confirm-button" onClick={handleConfirmClick}>
          확인
        </button>
        <button className="back-button" onClick={handleGoBack}>
          돌아가기
        </button>
      </div>

      <Dialog open={isConfirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>좌석 선택 확인</DialogTitle>
        <DialogContent>
          <p>Total Persons: {totalPersons}</p>
          <p>어린이: {childCount}명</p>
          <div className="person-button-container">
            {renderPersonButtons('child')}
          </div>
          <p>어른: {adultCount}명</p>
          <div className="person-button-container">
            {renderPersonButtons('adult')}
          </div>
        </DialogContent>
        <DialogActions>
          {confirmationButton}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CinemaSeat;