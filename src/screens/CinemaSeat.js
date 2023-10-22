import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
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
  formControl: {
    minWidth: 120,
  },
}));

const CinemaSeat = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [seatTypes, setSeatTypes] = useState([]); // 좌석 유형을 저장하는 배열을 추가합니다.

  const handleSeatClick = (seat) => {
    const index = selectedSeats.indexOf(seat);
    if (index > -1) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setSelectedCount(selectedCount - 1);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setSelectedCount(selectedCount + 1);
      setSeatTypes((prevSeatTypes) => [...prevSeatTypes, { seat, type: 'adult' }]);
    }
  };

  const handleConfirmClick = () => {
    console.log('선택된 좌석:', selectedSeats);
    console.log('좌석 별 유형:', seatTypes);
    setOpen(true);
  };

  const handleBackClick = () => {
    history.push('/Selection');
  };

  const handleClose = () => {
    setOpen(false);
    // 선택된 seatTypes에 따라 다른 페이지로 이동합니다.
    seatTypes.forEach(({ seat, type }) => {
      console.log(`좌석 ${seat + 1}의 유형: ${type}`);
      // 여기에서 seat와 type을 활용하여 필요한 작업을 수행하세요.
      // 예: DB에 저장, 서버에 전송 등
    });
    history.push('/PaymentPage'); // 기본적으로 PaymentPage로 이동합니다.
  };
  useEffect(() => {
    // selectedSeats가 변경된 후에 seatTypes를 업데이트합니다.
    setSeatTypes(selectedSeats.map((seat) => ({ seat, type: 'adult' })));
  }, [selectedSeats]);

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

      {/* 팝업 창 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>팝업 창</DialogTitle>
        <DialogContent>
        <p>선택된 좌석: {selectedSeats.map(seat => seat + 1).join(', ')}</p>

          {seatTypes.map(({ seat, type }) => (
            <FormControl key={seat} className={classes.formControl}>
              <InputLabel id={`seat-type-label-${seat + 1}`}>{`좌석 ${seat + 1} 유형 선택`}</InputLabel>
              <Select
                labelId={`seat-type-label-${seat+1}`}
                id={`seat-type-select-${seat+1}`}
                value={type}
                onChange={(e) => {
                  setSeatTypes(seatTypes.map((st) => (st.seat === seat ? { ...st, type: e.target.value } : st)));
                }}
              >
                <MenuItem value="adult">성인</MenuItem>
                <MenuItem value="senior">노약자</MenuItem>
                <MenuItem value="child">어린이</MenuItem>
              </Select>
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CinemaSeat;