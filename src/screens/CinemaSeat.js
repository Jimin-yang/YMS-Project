// CinemaSeat.js
import React, { useState } from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

const seatsPerRow = 5;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  seat: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    marginTop: theme.spacing(10),
  },
}));

function CinemaSeat() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const totalSeats = location.state && location.state.seats ? location.state.seats : 20;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    const index = selectedSeats.indexOf(seat);
    if (index > -1) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmClick = () => {
    console.log('선택된 좌석:', selectedSeats);
    history.goBack();
  };

  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <Box className={classes.root}>
      <h1>좌석 선택</h1>
      <Grid container justifyContent="center" spacing={3}>
        {[...Array(Math.ceil(totalSeats / seatsPerRow))].map((_, rowIndex) => (
          <Grid container item key={rowIndex} justifyContent="center" spacing={3}>
            {[...Array(seatsPerRow)].map((_, colIndex) => {
              const seatNumber = rowIndex * seatsPerRow + colIndex;
              return (
                <Grid item key={seatNumber}>
                  <Button
                    variant="contained"
                    color={selectedSeats.includes(seatNumber) ? 'secondary' : 'primary'}
                    onClick={() => handleSeatClick(seatNumber)}
                    className={classes.seat}
                  >
                    {seatNumber + 1}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>
      <Box className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleConfirmClick}>
          확인
        </Button>
        <Button variant="contained" color="secondary" onClick={handleBackClick} style={{ marginLeft: '10px' }}>
          돌아가기
        </Button>
      </Box>
    </Box>
  );
}

export default CinemaSeat;
   