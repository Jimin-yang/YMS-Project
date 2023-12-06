import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';  
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, Radio, FormControl, FormGroup } from '@material-ui/core'; // 추가

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: 'black', // 영화 상세 정보 텍스트의 색상을 검정으로 설정
  },
  header: {
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#f0f0f0',
    marginBottom: theme.spacing(3),
  },
  section: {
    marginBottom: theme.spacing(5),
  },
  label: {
    display: 'block',
    marginBottom: theme.spacing(1),
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  checkboxContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2), // 상영관 선택 버튼 간격 조절
  },
  checkbox: {
    padding: theme.spacing(1), // 상영시간 선택 버튼 스타일 수정
    borderRadius: '5px',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#ccc',
    },
  },
  blackColor: {
    color: 'black', // 추가된 클래스
  },
  spaceBetween: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  confirmButton: {
    padding: theme.spacing(2), // 확인 버튼 크기 조정
    fontSize: '1.2rem', // 폰트 사이즈 증가
  },
}));

function MovieDetailsPage() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [selectedTheaters, setSelectedTheaters] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  // movieTitle을 location.state에서 받아옵니다.
  const movieTitle = location.state ? location.state.movieTitle : 'Unknown Movie';
  const [styles, setStyles] = useState([]);
  const movie = location.state ? location.state.movie : null;
  const [seats, setSeats] = useState([
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
  ]);

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
  const [theaters, setTheaters] = useState(['상영관1', '상영관2', '상영관3']);
  const [times, setTimes] = useState(['08:00', '11:00', '14:00', '17:00', '20:00', '23:00']);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      const parsedMovies = JSON.parse(storedMovies);
      setMovies(parsedMovies);
      const foundMovie = parsedMovies.find(movie => movie.title === movieTitle);
      if (foundMovie && Array.isArray(foundMovie.theater) && Array.isArray(foundMovie.time)) {
        setMovies(foundMovie);
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
        setMovies(foundMovie);
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
  
  const isBothSelected = selectedTheaters.length > 0 && selectedTime.length > 0;

  const handleUpdateClick = () => {
    const newMovies = movies.map(movie => movie.title === movieTitle ? { ...movie, theater: selectedTheaters, time: selectedTime } : movie);
    setMovies(newMovies);
    localStorage.setItem('movies', JSON.stringify(newMovies));
    alert('상영관과 상영시간이 수정되었습니다.');
    history.goBack();
  };

  const handleConfirmClick = () => {
    
    if (!isBothSelected) {
      alert('상영관과 상영시간을 모두 선택해주세요.');
      return;
    }

    const selectedSeats = seats.filter((seat) => seat.selected).map((seat) => seat.id);
    const selectedTheater = selectedTheaters.join(', ');
  
    alert(`영화: ${movieTitle}\n상영관: ${selectedTheater}\n상영시간: ${selectedTime}`);
    history.push({
      pathname: '/CinemaSeat',
      state: {
        seats: selectedSeats,
        movieTitle: movieTitle,
        theater: selectedTheater,
        time: selectedTime,
      },
    });  
  };
  

  return (
    <Box className={classes.root}>
      <Typography variant="h3" component="h3" className={`${classes.center} ${classes.navy} ${classes.blackColor}`} gutterBottom>
        영화 상세 정보
      </Typography>
      <Typography variant="h4" component="h4" className={`${classes.center} ${classes.navy}`} gutterBottom>
        Title : {movieTitle}
      </Typography>
      <Typography variant="h6" component="h6" className={`${classes.center} ${classes.navy} ${classes.blackColor} ${classes.spaceBetween} ${classes.marginTop}`} gutterBottom>
        상영관 선택
      </Typography>
      <div className={`${classes.checkboxContainer} ${classes.spaceBetween}`}>
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
            className={classes.checkbox} // 변경된 스타일 클래스 적용
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
            className={classes.checkbox} // 변경된 스타일 클래스 적용
          />
        ))}
      </div>
      <Typography variant="h6" component="h6" className={`${classes.center} ${classes.navy} ${classes.blackColor} ${classes.marginTop}`} gutterBottom>
        상영시간 선택
      </Typography>
      <div className={classes.checkboxContainer}>
        <FormControl component="fieldset">
          <FormGroup row>
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
                className={classes.checkbox}
                classes={{ label: classes.label }}
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
                className={classes.checkbox}
                classes={{ label: classes.label }}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
      <Box display="flex" justifyContent="flex-end" className={classes.marginTop}>
        {isAdmin ? (
          <Button variant="contained" color="primary" onClick={handleUpdateClick} className={`${classes.button} ${classes.confirmButton}`}>
            수정
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleConfirmClick} className={`${classes.button} ${classes.confirmButton}`}>
            확인
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default MovieDetailsPage;