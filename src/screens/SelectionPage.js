import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Fade, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useStyles } from '../styles';

function SelectionPage() {
  const styles = useStyles();
  const history = useHistory();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin;
  const [password, setPassword] = useState('');
  const correctPassword = 'admin123';
  const [open, setOpen] = useState(false); // 팝업 창의 열림/닫힘 상태를 관리하는 상태

  const movies = [
    { title: 'The Shawshank Redemption', image: 'path_to_image1' },
    { title: 'The Godfather', image: 'path_to_image2' },
    { title: 'The Dark Knight', image: 'path_to_image3' },
    { title: 'Inception', image: 'path_to_image4' },
    { title: 'The Matrix', image: 'path_to_image5' },
    { title: 'Pulp Fiction', image: 'path_to_image6' },
    { title: '새 영화 추가', image: null },
  ];

  const handleMovieClick = (movieTitle) => {
    if (movieTitle === '새 영화 추가') {
      setOpen(true); // '새 영화 추가' 버튼을 클릭하면 팝업 창을 엽니다.
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

  const handleClose = () => {
    setOpen(false); // '닫기' 버튼을 클릭하면 팝업 창을 닫습니다.
  };

  const handleConfirmClick = () => {
    history.replace('/HomePage'); // 모든 히스토리를 삭제하고 HomePage.js로 이동합니다.
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]} style={{ position: 'relative' }}>
        <Box className={[styles.main, styles.center]}>
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
              (movie.title !== '새 영화 추가' || isAdmin) && (
                <Card key={index} className={[styles.card, styles.space]} onClick={() => handleMovieClick(movie.title)}>
                  <CardActionArea>
                    {movie.image ? (
                      <CardMedia
                        component="img"
                        alt={movie.title}
                        image={movie.image}
                        className={styles.media}
                      />
                    ) : (
                      <Box className={styles.media} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        (+)
                      </Box>
                    )}
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
              )
            ))}
          </Box>
          {/* 팝업 창 */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>새 영화 추가</DialogTitle>
            <DialogContent>
              <TextField autoFocus margin="dense" label="영화 제목" fullWidth />
              <TextField margin="dense" label="영화 이미지 URL" fullWidth />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                취소
              </Button>
              <Button onClick={handleClose} color="primary">
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