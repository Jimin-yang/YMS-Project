import React, { useState } from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const totalSeats = 20;
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
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0); // 선택한 좌석 수를 저장하는 상태 변수를 추가합니다.

    const handleSeatClick = (seat) => {
        const index = selectedSeats.indexOf(seat);
        if (index > -1) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
            setSelectedCount(selectedCount - 1); // 선택한 좌석 수를 감소시킵니다.
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setSelectedCount(selectedCount + 1); // 선택한 좌석 수를 증가시킵니다.
        }
    };

    const handleConfirmClick = () => {
        console.log('선택된 좌석:', selectedSeats);
        console.log('선택된 인원:', selectedCount); // 선택한 인원 수를 출력합니다.
    };

    const handleBackClick = () => {
        history.push('/Selection');
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