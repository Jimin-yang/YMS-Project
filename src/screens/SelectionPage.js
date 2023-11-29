import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Fade,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // 스타일 클래스들 정의...
}));

const SelectionPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin;
  const isDeleting = location.state?.isDeleting;

  const [password, setPassword] = useState('');
  const correctPassword = 'admin123';
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieImage, setNewMovieImage] = useState('');
  const [newMovieTheater, setNewMovieTheater] = useState('');
  const [newMovieTime, setNewMovieTime] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    // 서버에서 영화 선택 페이지 데이터를 가져옵니다.
    axios.get('http://localhost:3001/api/selection-data')
      .then(response => {
        // 가져온 데이터를 상태로 설정합니다.
        setShowings(response.data);
      })
      .catch(error => {
        console.error('Error fetching selection data: ', error);
      });
  }, []);
  
  const handleMovieClick = (showingId) => {
    const selectedShowing = showings.find(showing => showing.id === showingId);
  
    if (selectedShowing) {
      const { movieid, theaterid, timeid } = selectedShowing;
  
      axios.get(`http://localhost:3001/api/movies/${movieid}`)
        .then(movieResponse => {
          const movieTitle = movieResponse.data.title;
  
          axios.get(`http://localhost:3001/api/theaters/${theaterid}`)
            .then(theaterResponse => {
              const theaterName = theaterResponse.data.name;
  
              axios.get(`http://localhost:3001/api/times/${timeid}`)
                .then(timeResponse => {
                  const timeValue = timeResponse.data.value;
  
                  if (movieTitle === '새 영화 추가' && !isDeleting) {
                    setOpenAdd(true);
                  } else if (isAdmin) {
                    history.push({
                      pathname: '/MovieDetailsPage',
                      state: { showingId, isAdmin: true },
                    });
                  } else if (isDeleting) {
                    setSelectedMovie(showingId);
                    setOpenDelete(true);
                  } else {
                    history.push({
                      pathname: '/MovieDetailsPage',
                      state: { movieTitle, theaterName, timeValue },
                    });
                  }
                })
                .catch(error => {
                  console.error('Error fetching time: ', error);
                });
            })
            .catch(error => {
              console.error('Error fetching theater: ', error);
            });
        })
        .catch(error => {
          console.error('Error fetching movie: ', error);
        });
    }
  };
  

  return (
    <Box className={classes.cards}>
      <Box className={classes.main}>
        <Box className={classes.cards}>
          {showings.map((showing) => (
            <Card
              key={showing.id} // 여기에 key 추가
              className={`${classes.card} ${showing.movieTitle === '새 영화 추가' ? classes.adminButton : ''}`}
              onClick={() => handleMovieClick(showing.id)}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={showing.movieImage}
                  title={showing.movieTitle}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {showing.movieTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`상영관: ${showing.theater}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`상영시간: ${showing.time}`}
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SelectionPage;
