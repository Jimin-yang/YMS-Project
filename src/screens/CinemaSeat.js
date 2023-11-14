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
  const totalSeats = 30;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieTitle, setMovieTitle] = useState('Unknown Movie');
  const [theater, setTheater] = useState('Unknown Theater');
  const [time, setTime] = useState('Unknown Time');
  const [totalPersons, setTotalPersons] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false); // 확인 창 상태 추가

  const location = useLocation();
  const history = useHistory();
  const { seats, movieTitle: selectedMovieTitle, theater: selectedTheater, time: selectedTime } = location.state;

  useEffect(() => {
    setSelectedSeats(seats);
    setMovieTitle(selectedMovieTitle);
    setTheater(selectedTheater);
    setTime(selectedTime);
  }, [seats, selectedMovieTitle, selectedTheater, selectedTime]);

  const handleSeatClick = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
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
    setConfirmationOpen(true);
  };

  const handleChildCountChange = (count) => {
    setChildCount(count);
    setAdultCount(totalPersons - count); // 어른 수 자동 조정
  };

  const handleAdultCountChange = (count) => {
    setAdultCount(count);
    setChildCount(totalPersons - count); // 어린이 수 자동 조정
  };

  const handleConfirmationButtonClick = () => {
    handlePaymentPageNavigation();
    setConfirmationOpen(false);
  };

  const handlePaymentPageNavigation = () => {
    history.push('/PaymentPage', {
      movieTitle: movieTitle,
      theater: theater,
      time: time,
      selectedSeats: selectedSeats,
      childCount: childCount,
      adultCount: adultCount,
      totalPersons: totalPersons,
    });
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isSelected = selectedSeats.includes(i);
      seats.push(
        <div
          key={i}
          className={`seat ${isSelected ? 'selected' : ''}`}
          onClick={() => handleSeatClick(i)}
        >
          {isSelected ? 'X' : i}
        </div>
      );
    }
    return seats;
  };

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

      <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>좌석 선택 확인</DialogTitle>
        <DialogContent>
          <p>Total Persons: {totalPersons}</p>
          <p>어린이: {childCount}명</p>
          <div className="person-button-container">
            {[...Array(totalPersons + 1)].map((_, index) => (
              <Button
                key={`child-${index}`}
                className={`child-button ${childCount === index ? 'selected' : ''}`}
                onClick={() => handleChildCountChange(index)}
              >
                {index}명
              </Button>
            ))}
          </div>
          <p>어른: {adultCount}명</p>
          <div className="person-button-container">
            {[...Array(totalPersons + 1)].map((_, index) => (
              <Button
                key={`adult-${index}`}
                className={`adult-button ${adultCount === index ? 'selected' : ''}`}
                onClick={() => handleAdultCountChange(index)}
              >
                {index}명
              </Button>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationButtonClick} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CinemaSeat;