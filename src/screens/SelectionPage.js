import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Fade, Button, TextField } from '@material-ui/core';
import { useStyles } from '../styles';

function SelectionPage() {
  const styles = useStyles();
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'admin123';

  const movies = [
    { title: 'The Shawshank Redemption', image: 'path_to_image1' },
    { title: 'The Godfather', image: 'path_to_image2' },
    { title: 'The Dark Knight', image: 'path_to_image3' },
    { title: 'Inception', image: 'path_to_image4' },
    { title: 'The Matrix', image: 'path_to_image5' },
    { title: 'Pulp Fiction', image: 'path_to_image6' },
  ];

  const handleMovieClick = (movieTitle) => {
    history.push({
      pathname: '/MovieDetailsPage',
      state: { movieTitle },
    });
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
        setIsAdmin(true);
    } else {
        alert('비밀번호가 일치하지 않습니다.');
    }
  }

  if (isAdmin) {
    return (
      <div>
        <h1>관리자 모드</h1>
        <Box className={styles.adminBox}>
          <TextField label="비밀번호" type="password" value={password} onChange={handlePasswordChange}></TextField>
          <Button variant="contained" color="primary" onClick={handleLoginClick} className={styles.adminLogin}>
            로그인
          </Button>
        </Box>
      </div>
    )
  }

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]} style={{ position: 'relative' }}>
        <Box className={[styles.main, styles.center]}>
          <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleAdminClick} className={styles.adminButton} style={{ width: '150px', fontSize: '1rem' }}> {/* 이 부분을 추가합니다. */}
              관리자 전환 
            </Button>
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
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

export default SelectionPage;