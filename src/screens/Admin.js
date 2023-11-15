/*
11/15

* handleDeleteClick, setPreviousMovies 함수를 호출하는 부분을 제거, 
setMovies 함수를 호출 후 previousMovies 상태를 업데이트

* handleUndoClick, localStorage에 저장된 이전 영화 목록을 가져와서 
previousMovies 상태를 업데이트하는 부분을 제거

* handleResetClick, localStorage에 저장된 초기 영화 목록을 가져와서 
setMovies 함수를 호출하는 부분을 제거

* displayMovies 배열을 생성하는 부분 movies 배열에서 바로 생성하도록 변경
*/ 


// Admin.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { adminStyles } from '../styles';

function Admin() {
  const classes = adminStyles();
  const history = useHistory();

  const initialMovies = [
    { title: 'The Shawshank Redemption', image: 'path_to_image1', theater: 'Theater 1', time: '12:00' },
    { title: 'The Godfather', image: 'path_to_image2', theater: 'Theater 2', time: '15:00' },
    { title: 'The Dark Knight', image: 'path_to_image3', theater: 'Theater 3', time: '18:00' },
    { title: 'Inception', image: 'path_to_image4', theater: 'Theater 4', time: '21:00' },
    { title: 'The Matrix', image: 'path_to_image5', theater: 'Theater 5', time: '24:00' },
    { title: 'Pulp Fiction', image: 'path_to_image6', theater: 'Theater 6', time: '03:00' },
  ];

  const [movies, setMovies] = useState(() => {
    const storedMovies = localStorage.getItem('movies');
    return storedMovies ? JSON.parse(storedMovies) : initialMovies;
  });
  const [previousMovies, setPreviousMovies] = useState([]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleDeleteClick = (movieTitle) => {
    const newMovies = movies.filter(movie => movie.title !== movieTitle);
    setPreviousMovies(movies);
    setMovies(newMovies);
  };

  const handleUndoClick = () => {
    setMovies(previousMovies);
  };

  const handleResetClick = () => {
    setMovies(initialMovies);
  };

  const handleAddClick = () => {
    history.push('/SelectionPage', { isAdmin: true });
  };

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 4) % movies.length);
  };

  const handlePrevClick = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex - 4 + movies.length) % movies.length);
  };

  const displayMovies = [
    movies[currentMovieIndex],
    movies[(currentMovieIndex + 1) % movies.length],
    movies[(currentMovieIndex + 2) % movies.length],
    movies[(currentMovieIndex + 3) % movies.length],
  ];

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        관리자 페이지
      </Typography>
      {movies.length > 0 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <IconButton onClick={handlePrevClick} className={classes.arrowButton}>
            <ArrowBackIosIcon />
          </IconButton>
          <Grid container item xs={8} spacing={3}>
            {displayMovies.map((movie, index) => (
              <Grid item xs={6} key={index}>
                <Card className={classes.movieCard}>
                  <CardContent>
                    <Typography variant="h5" component="h5" className={classes.movieTitle}>
                      {movie.title}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => history.push('/MovieDetailsPage', { movieTitle: movie.title, isAdmin: true })} className={classes.button}>
                      수정
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(movie.title)} className={classes.button}>
                      삭제
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <IconButton onClick={handleNextClick} className={classes.arrowButton}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      )}
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleAddClick} className={classes.button}>
          영화 추가
        </Button>
        <Button variant="contained" color="primary" onClick={handleUndoClick} className={classes.button}>
          되돌리기
        </Button>
        <Button variant="contained" color="primary" onClick={handleResetClick} className={classes.button}>
          초기화
        </Button>
      </Box>
    </Container>
  );
}

export default Admin;