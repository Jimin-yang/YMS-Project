import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../styles'; // styles.js를 가져와서 사용

function MovieDetailsPage() {
  const styles = useStyles(); // 스타일을 가져와서 사용
  const history = useHistory();
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleNextClick = () => {
    alert(`영화: ${history.location.state.movieTitle}\n상영관: ${selectedTheater}\n상영시간: ${selectedTime}`);
    history.push('/CinemaSeat'); // 확인 버튼을 누르면 '/CinemaSeat' 경로로 이동합니다.
  };

  return (
    <Box className={styles.root}>
      <Typography variant="h3" component="h3" className={`${styles.center} ${styles.navy}`} gutterBottom>
        영화 상세 정보
      </Typography>
      <Typography variant="h4" component="h4" className={`${styles.center} ${styles.navy}`} gutterBottom>
        {history.location.state.movieTitle}
      </Typography>
      <FormControl variant="outlined" className={styles.formControl}>
        <InputLabel id="theater-label">상영관</InputLabel>
        <Select
          labelId="theater-label"
          id="theater"
          value={selectedTheater}
          onChange={handleTheaterChange}
          label="상영관"
        >
          <MenuItem value="A관">A관</MenuItem>
          <MenuItem value="B관">B관</MenuItem>
          <MenuItem value="C관">C관</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={styles.formControl}>
        <InputLabel id="time-label">상영시간</InputLabel>
        <Select
          labelId="time-label"
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
          label="상영시간"
        >
          <MenuItem value="10:00">10:00</MenuItem>
          <MenuItem value="14:00">14:00</MenuItem>
          <MenuItem value="18:00">18:00</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleNextClick} className={styles.button}>
        다음
      </Button>
    </Box>
  );
}

export default MovieDetailsPage;