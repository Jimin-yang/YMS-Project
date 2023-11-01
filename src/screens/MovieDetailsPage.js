import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography, Button, FormControlLabel, Radio, Checkbox } from '@material-ui/core';
import { useStyles } from '../styles';

function MovieDetailsPage() {
  const styles = useStyles();
  const history = useHistory();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin;
  const movieTitle = location.state?.movieTitle || 'Unknown Movie';


  const initialMovies = [
    { title: 'The Godfather', image: 'path_to_image1', theater: ['상영관1'], time: ['10:00'] },
    { title: 'The Dark Knight', image: 'path_to_image2', theater: ['상영관2'], time: ['14:00'] },
    { title: 'Inception', image: 'path_to_image3', theater: ['상영관3'], time: ['17:00'] },
    { title: 'The Matrix', image: 'path_to_image4', theater: ['상영관1'], time: ['10:00'] },
    { title: 'Pulp Fiction', image: 'path_to_image5', theater: ['상영관2'], time: ['14:00'] },
  ];

  const allTheaters = ['상영관1', '상영관2', '상영관3'];
  const allTimes = ['08:00', '11:00', '14:00', '17:00', '20:00', '23:00'];

  // 상영관별 좌석 수 정보
  const theaterSeats = {
    '상영관1': 20,
    '상영관2': 30,
    '상영관3': 40,
  };

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [selectedTheaters, setSelectedTheaters] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [theaters, setTheaters] = useState(['상영관1', '상영관2', '상영관3']);
  const [times, setTimes] = useState(['08:00', '11:00', '14:00', '17:00', '20:00', '23:00']);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      const parsedMovies = JSON.parse(storedMovies);
      setMovies(parsedMovies);
      const foundMovie = parsedMovies.find(movie => movie.title === movieTitle);
      if (foundMovie && Array.isArray(foundMovie.theater) && Array.isArray(foundMovie.time)) {
        setMovie(foundMovie);
        setSelectedTheaters([foundMovie.theater[0]]);
        setSelectedTime([foundMovie.time[0]]);
        setTheaters(foundMovie.theater);
        setTimes(foundMovie.time);
      }
    } else {
      setMovies(initialMovies);
      localStorage.setItem('movies', JSON.stringify(initialMovies));
      const foundMovie = initialMovies.find(movie => movie.title === movieTitle);
      if (foundMovie && Array.isArray(foundMovie.theater) && Array.isArray(foundMovie.time)) {
        setMovie(foundMovie);
        setSelectedTheaters([foundMovie.theater[0]]);
        setSelectedTime([foundMovie.time[0]]);
        setTheaters(foundMovie.theater);
        setTimes(foundMovie.time);
      }
    }
  }, [movieTitle]);

  const handleTheaterChange = (event) => {
    if (isAdmin) {
      setSelectedTheaters((prev) =>
        event.target.checked ? [...prev, event.target.value] : prev.filter((theater) => theater !== event.target.value)
      );
    } else {
      setSelectedTheaters([event.target.value]);
    }
  };
  
  const handleTimeChange = (event) => {
    if (isAdmin) {
      setSelectedTime((prev) =>
        event.target.checked ? [...prev, event.target.value] : prev.filter((time) => time !== event.target.value)
      );
    } else {
      setSelectedTime([event.target.value]);
    }
  };
  

  const handleUpdateClick = () => {
    const newMovies = movies.map(movie => movie.title === movieTitle ? { ...movie, theater: selectedTheaters, time: selectedTime } : movie);
    setMovies(newMovies);
    localStorage.setItem('movies', JSON.stringify(newMovies));
    alert('상영관과 상영시간이 수정되었습니다.');
    history.goBack();
  };

  const handleConfirmClick = () => {
    alert(`영화: ${movieTitle}\n상영관: ${selectedTheaters.join(', ')}\n상영시간: ${selectedTime.join(', ')}`);
    history.push('/CinemaSeat', { theater: selectedTheaters[0], seats: theaterSeats[selectedTheaters[0]] });
  };

  return (
    <Box className={styles.root}>
      <Typography variant="h3" component="h3" className={`${styles.center} ${styles.navy}`} gutterBottom>
        영화 상세 정보
      </Typography>
      <Typography variant="h4" component="h4" className={`${styles.center} ${styles.navy}`} gutterBottom>
        {movieTitle}
      </Typography>
      <Typography variant="h6" component="h6" className={`${styles.center} ${styles.navy}`} gutterBottom>
        상영관 선택
      </Typography>
      {isAdmin ? allTheaters.map((theater, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={selectedTheaters.includes(theater)}
              onChange={handleTheaterChange}
              value={theater}
              name="theater"
              color="primary"
            />
          }
          label={theater}
        />
      )) : theaters.map((theater, index) => (
        <FormControlLabel
          key={index}
          control={
            <Radio
              checked={selectedTheaters.includes(theater)}
              onChange={handleTheaterChange}
              value={theater}
              name="theater"
              color="primary"
            />
          }
          label={theater}
        />
      ))}
      <Typography variant="h6" component="h6" className={`${styles.center} ${styles.navy}`} gutterBottom>
        상영시간 선택
      </Typography>
      {isAdmin ? allTimes.map((time, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={selectedTime.includes(time)}
              onChange={handleTimeChange}
              value={time}
              name="time"
              color="primary"
            />
          }
          label={time}
        />
      )) : times.map((time, index) => (
        <FormControlLabel
          key={index}
          control={
            <Radio
              checked={selectedTime.includes(time)}
              onChange={handleTimeChange}
              value={time}
              name="time"
              color="primary"
            />
          }
          label={time}
        />
      ))}
      {isAdmin ? (
        <Button variant="contained" color="primary" onClick={handleUpdateClick} className={styles.button}>
          수정
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleConfirmClick} className={styles.button}>
          확인
        </Button>
      )}
    </Box>
  );
}

export default MovieDetailsPage;
