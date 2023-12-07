import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  FormControl,  
  FormControlLabel,
  Checkbox,
  Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {  } from '@material-ui/core';

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
  const storedTheaters = localStorage.getItem('selectedTheaters');
  const storedTimes = localStorage.getItem('selectedTime');

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { showingId } = useParams();

  // 상태 변수들 선언
  const [selectedTheaters, setSelectedTheaters] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
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

  const allTheatersAdmin = ['상영관1', '상영관2', '상영관3'];
  const allTimesAdmin = ['08:00', '11:00', '14:00', '17:00', '20:00', '23:00'];

  const theaterSeats = {
    '상영관1': 20,
    '상영관2': 30,
    '상영관3': 40,
  };

  const [movies, setMovies] = useState([]);
  const [allTheaters, setAllTheaters] = useState(['상영관1', '상영관2', '상영관3']);
  const [allTimes, setAllTimes] = useState(['08:00', '11:00', '14:00', '17:00', '20:00', '23:00']);
  const [selectedTheatersAdmin, setSelectedTheatersAdmin] = useState([]);
  const [selectedTimeAdmin, setSelectedTimeAdmin] = useState([]);

  useEffect(() => {
    // 저장된 상영관과 시간이 있다면 해당 값을 상태에 설정
    if (storedTheaters) {
      setSelectedTheaters(JSON.parse(storedTheaters));
    }
    if (storedTimes) {
      setSelectedTime(JSON.parse(storedTimes));
    }
  }, []);

  useEffect(() => {
    // isAdmin 상태를 location.state에서 받아옴
    if (location.state && location.state.isAdmin !== undefined) {
      setIsAdmin(location.state.isAdmin);
    }
    // ... 나머지 useEffect 로직
  }, [location.state]);

  useEffect(() => {
    if (!isAdmin) {
      // isAdmin이 false일 때 관리자가 선택한 값을 일반 사용자에게 보여주기
      setSelectedTheaters(selectedTheatersAdmin); // selectedTheaters 초기화
      setSelectedTime(selectedTimeAdmin); // selectedTime 초기화
    }
  }, [isAdmin, selectedTheatersAdmin, selectedTimeAdmin]);
  
  // 두 번째 useEffect 수정
  useEffect(() => {
    if (isAdmin) {
      // isAdmin이 true일 때 모든 상영관과 시간을 선택지로 설정
      setAllTheaters(allTheatersAdmin);
      setAllTimes(allTimesAdmin);
    } else {
      // isAdmin이 false일 때 관리자가 선택한 값을 일반 사용자에게 보여주기
      setSelectedTheatersAdmin(selectedTheaters);
      setSelectedTimeAdmin(selectedTime);
    }
  }, [isAdmin]);

  const [selectedTheaterUser, setSelectedTheaterUser] = useState('');
  const [selectedTimeUser, setSelectedTimeUser] = useState('');
  
  // 상영관 선택 부분 수정
  const handleTheaterChange = (event, theater) => {
    const { checked } = event.target;

    if (isAdmin) {
      const updatedTheaters = checked
        ? [...selectedTheatersAdmin, theater]
        : selectedTheatersAdmin.filter((selected) => selected !== theater);
      setSelectedTheatersAdmin(updatedTheaters);
    } else {
      // 사용자는 하나의 상영관만 선택하도록 설정
      setSelectedTheaterUser(checked ? theater : '');
    }
  };

  // 상영시간 선택 부분 수정
  const handleTimeChange = (event, time) => {
    const { checked } = event.target;

    if (isAdmin) {
      const updatedTimes = checked
        ? [...selectedTimeAdmin, time]
        : selectedTimeAdmin.filter((selected) => selected !== time);
      setSelectedTimeAdmin(updatedTimes);
    } else {
      // 사용자는 하나의 상영시간만 선택하도록 설정
      setSelectedTimeUser(checked ? time : '');
    }
  };

  const isBothSelected = isAdmin
    ? selectedTheatersAdmin.length > 0 && selectedTimeAdmin.length > 0
    : !!selectedTheaterUser && !!selectedTimeUser;

  const handleUpdateClick = () => {
    setAllTheaters(selectedTheatersAdmin);
    setAllTimes(selectedTimeAdmin);

    localStorage.setItem('selectedTheaters', JSON.stringify(selectedTheatersAdmin));
    localStorage.setItem('selectedTime', JSON.stringify(selectedTimeAdmin));

    alert('상영관과 상영시간이 수정되었습니다.');
    history.goBack();
  };

  const handleConfirmClick = () => {
    if (!selectedTheaterUser || !selectedTimeUser) {
      alert('상영관과 상영시간을 모두 선택해주세요.');
      return;
    }

    const selectedSeats = seats.filter((seat) => seat.selected).map((seat) => seat.id);
    const selectedTheater = isAdmin ? selectedTheatersAdmin.join(', ') : selectedTheaterUser;
    const selectedTimeValue = isAdmin ? selectedTimeAdmin : selectedTimeUser;

    localStorage.setItem('selectedTheaters', JSON.stringify(selectedTheater));
    localStorage.setItem('selectedTime', JSON.stringify(selectedTimeValue));

    history.push({
      pathname: '/CinemaSeat',
      state: {
        seats: selectedSeats,
        movieTitle: movieTitle,
        theater: selectedTheater,
        time: selectedTimeValue,
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
        {allTheaters.map((theater, index) => (
          <FormControlLabel
            key={index}
            value={theater}
            control={isAdmin ? (
              <Checkbox
                checked={selectedTheatersAdmin.includes(theater)}
                onChange={(event) => handleTheaterChange(event, theater)}
                color="primary"
                disabled={!isAdmin}
              />
            ) : (
              <Radio
                checked={selectedTheaterUser === theater}
                onChange={(event) => handleTheaterChange(event, theater)}
                color="primary"
                disabled={isAdmin}
              />
            )}
            label={theater}
            className={classes.checkbox}
          />
        ))}
      </div>
      <Typography variant="h6" component="h6" className={`${classes.center} ${classes.navy} ${classes.blackColor} ${classes.marginTop}`} gutterBottom>
        상영시간 선택
      </Typography>
      <div className={classes.checkboxContainer}>
        <FormControl component="fieldset">
          <div className={`${classes.checkboxContainer} ${classes.spaceBetween}`}>
            {allTimes.map((time, index) => (
              <FormControlLabel
                key={index}
                value={time}
                control={isAdmin ? (
                  <Checkbox
                    checked={selectedTimeAdmin.includes(time)}
                    onChange={(event) => handleTimeChange(event, time)}
                    color="primary"
                    disabled={!isAdmin}
                  />
                ) : (
                  <Radio
                    checked={selectedTimeUser === time}
                    onChange={(event) => handleTimeChange(event, time)}
                    color="primary"
                    disabled={isAdmin}
                  />
                )}
                label={time}
                className={classes.checkbox}
                classes={{ label: classes.label }}
              />
            ))}
          </div>
        </FormControl>
      </div>
      <Box display="flex" justifyContent="flex-end" className={classes.marginTop}>
        {isAdmin ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateClick}
            className={`${classes.button} ${classes.confirmButton}`}
          >
            수정
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmClick}
            className={`${classes.button} ${classes.confirmButton}`}
          >
            확인
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default MovieDetailsPage;