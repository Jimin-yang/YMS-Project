import React, { useState } from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'; // useHistory를 import 합니다.

const totalSeats = 20; // 총 좌석 수를 설정합니다.
const seatsPerRow = 5; // 한 행에 배치할 좌석 수를 설정합니다.

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
    const history = useHistory(); // useHistory hook을 사용하여 history 객체를 가져옵니다.
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seat) => {
        const index = selectedSeats.indexOf(seat);
        if (index > -1) {
            // 이미 선택된 좌석을 클릭하면 선택 해제합니다.
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            // 선택되지 않은 좌석을 클릭하면 선택합니다.
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleConfirmClick = () => {
        console.log('선택된 좌석:', selectedSeats);
    };

    const handleBackClick = () => {
        history.push('/Selection'); // '돌아가기' 버튼을 클릭하면 '/Selection' 경로로 이동합니다.
    };

    return (
        <Box className={classes.root}>
            <h1>좌석 선택</h1>
            <Grid container justifyContent="center" spacing={3}>
                {[...Array(totalSeats / seatsPerRow)].map((_, rowIndex) => (
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