// SelectionPage.js
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Fade, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useStyles } from '../styles';

function SelectionPage() {
  const styles = useStyles();
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

  const [movies, setMovies] = useState([
    { title: 'The Shawshank Redemption', image: 'path_to_image1', theater: 'Theater 1', time: '12:00' },
    { title: 'The Godfather', image: 'path_to_image2', theater: 'Theater 2', time: '15:00' },
    { title: 'The Dark Knight', image: 'path_to_image3', theater: 'Theater 3', time: '18:00' },
    { title: 'Inception', image: 'path_to_image4', theater: 'Theater 4', time: '21:00' },
    { title: 'The Matrix', image: 'path_to_image5', theater: 'Theater 5', time: '24:00' },
    { title: 'Pulp Fiction', image: 'path_to_image6', theater: 'Theater 6', time: '03:00' },
  ]);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  const handleMovieClick = (movieTitle) => {
    if (movieTitle === '새 영화 추가') {
      if (!isDeleting) {
        setOpenAdd(true);
      }
    } else if (isAdmin) {
      history.push({
        pathname: '/MovieDetailsPage',
        state: { movieTitle, isAdmin: true },
      });
    } else if (isDeleting) {
      setSelectedMovie(movieTitle);
      setOpenDelete(true);
    } else {
      history.push({
        pathname: '/MovieDetailsPage',
        state: { movieTitle },
      });
    }
  };

  const handleAdminClick = (event) => {
    event.stopPropagation();
    history.push('/AdminPage');
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLoginClick = () => {
    if (password === correctPassword) {
      alert('로그인 성공!');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  }

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirmClick = () => {
    history.push('/');
  };

  const handleNewMovieTitleChange = (event) => {
    setNewMovieTitle(event.target.value);
  };

  const handleNewMovieImageChange = (event) => {
    setNewMovieImage(event.target.value);
  };

  const handleNewMovieTheaterChange = (event) => {
    setNewMovieTheater(event.target.value);
  };

  const handleNewMovieTimeChange = (event) => {
    setNewMovieTime(event.target.value);
  };

  const handleAddClick = () => {
    const newMovies = [...movies, { title: newMovieTitle, image: newMovieImage, theater: newMovieTheater, time: newMovieTime }];
    setMovies(newMovies);
    localStorage.setItem('movies', JSON.stringify(newMovies));
    setOpenAdd(false);
  };

  const handleDeleteClick = () => {
    const newMovies = movies.filter(movie => movie.title !== selectedMovie);
    setMovies(newMovies);
    localStorage.setItem('movies', JSON.stringify(newMovies));
    setOpenDelete(false);
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]} style={{ position: 'relative' }}>
        <Box className={[styles.main, styles.center, styles.initialCenter]}>  
          <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {isAdmin ? (
              <Button variant="contained" color="primary" onClick={handleConfirmClick} className={styles.adminButton} style={{ width: '150px', fontSize: '1rem' }}>
                확인
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleAdminClick} className={styles.adminButton} style={{ width: '150px', fontSize: '1rem' }}>
                관리자 전환 
              </Button>
            )}
          </Box>
          <Typography variant="h3" component="h3" className={styles.center} style={{ fontFamily: 'BMEULJIRO, sans-serif', marginBottom: '50px' }} gutterBottom>
            영화를 선택해주세요
          </Typography>
          <Box className={styles.cards}>
            {movies.map((movie, index) => (
              <Card key={index} className={[styles.card, styles.space]} onClick={() => handleMovieClick(movie.title)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={movie.title}
                    image={movie.image}
                    className={styles.media}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      color="textPrimary"
                      component="p"
                    >
                      {movie.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
            {isAdmin && !isDeleting && (
              <Card className={[styles.card, styles.space]} onClick={() => handleMovieClick('새 영화 추가')}>
                <CardActionArea>
                  <Box className={styles.media} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      color="textPrimary"
                      component="p"
                    >
                      새 영화 추가
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Box>
          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>새 영화 추가</DialogTitle>
            <DialogContent>
              <TextField autoFocus margin="dense" label="영화 제목" fullWidth onChange={handleNewMovieTitleChange} />
              <TextField margin="dense" label="영화 이미지 URL" fullWidth onChange={handleNewMovieImageChange} />
              <TextField margin="dense" label="상영관" fullWidth onChange={handleNewMovieTheaterChange} />
              <TextField margin="dense" label="상영시간" fullWidth onChange={handleNewMovieTimeChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd} color="primary">
                취소
              </Button>
              <Button onClick={handleAddClick} color="primary">
                추가
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Fade>
  );
}
export default SelectionPage;