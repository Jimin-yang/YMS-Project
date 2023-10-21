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
  const [openAdd, setOpenAdd] = useState(false); // '추가' 팝업 창의 열림/닫힘 상태를 관리하는 상태
  const [openDelete, setOpenDelete] = useState(false); // '삭제' 팝업 창의 열림/닫힘 상태를 관리하는 상태
  const [newMovieTitle, setNewMovieTitle] = useState(''); // 새 영화 제목을 관리하는 상태
  const [newMovieImage, setNewMovieImage] = useState(''); // 새 영화 이미지 URL을 관리하는 상태
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택한 영화를 관리하는 상태

  const [movies, setMovies] = useState([ // movies 배열을 상태로 관리합니다.
    { title: 'The Shawshank Redemption', image: 'path_to_image1' },
    { title: 'The Godfather', image: 'path_to_image2' },
    { title: 'The Dark Knight', image: 'path_to_image3' },
    { title: 'Inception', image: 'path_to_image4' },
    { title: 'The Matrix', image: 'path_to_image5' },
    { title: 'Pulp Fiction', image: 'path_to_image6' },
  ]);

  // 페이지가 로드될 때 localStorage에서 영화 목록을 불러옵니다.
  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  const handleMovieClick = (movieTitle) => {
    if (movieTitle === '새 영화 추가') {
      if (!isDeleting) {
        setOpenAdd(true); // '새 영화 추가' 버튼을 클릭하면 '추가' 팝업 창을 엽니다.
      }
    } else if (!isAdmin || isDeleting) { // 관리자가 아닐 때만 다른 영화 선택이 가능합니다.
      if (isDeleting) {
        setSelectedMovie(movieTitle);
        setOpenDelete(true);
      } else {
        history.push({
          pathname: '/MovieDetailsPage',
          state: { movieTitle },
        });
      }
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
    setOpenAdd(false); // '닫기' 버튼을 클릭하면 '추가' 팝업 창을 닫습니다.
  };

  const handleCloseDelete = () => {
    setOpenDelete(false); // '닫기' 버튼을 클릭하면 '삭제' 팝업 창을 닫습니다.
  };

  const handleConfirmClick = () => {
    history.push('/'); // 첫 페이지로 이동합니다.
  };

  const handleNewMovieTitleChange = (event) => {
    setNewMovieTitle(event.target.value); // 입력한 새 영화 제목을 상태에 저장합니다.
  };

  const handleNewMovieImageChange = (event) => {
    setNewMovieImage(event.target.value); // 입력한 새 영화 이미지 URL을 상태에 저장합니다.
  };

  const handleAddClick = () => {
    const newMovies = [...movies, { title: newMovieTitle, image: newMovieImage }];
    setMovies(newMovies); // 입력한 새 영화 정보를 movies 배열에 추가합니다.
    localStorage.setItem('movies', JSON.stringify(newMovies)); // 영화 목록을 localStorage에 저장합니다.
    setOpenAdd(false); // '추가' 버튼을 클릭하면 '추가' 팝업 창을 닫습니다.
  };

  const handleDeleteClick = () => {
    const newMovies = movies.filter(movie => movie.title !== selectedMovie);
    setMovies(newMovies); // 선택한 영화를 movies 배열에서 삭제합니다.
    localStorage.setItem('movies', JSON.stringify(newMovies)); // 영화 목록을 localStorage에 저장합니다.
    setOpenDelete(false); // '예' 버튼을 클릭하면 '삭제' 팝업 창을 닫습니다.
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
                    {/* '(+)'를 삭제합니다. */}
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
          {/* '추가' 팝업 창 */}
          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>새 영화 추가</DialogTitle>
            <DialogContent>
              <TextField autoFocus margin="dense" label="영화 제목" fullWidth onChange={handleNewMovieTitleChange} />
              <TextField margin="dense" label="영화 이미지 URL" fullWidth onChange={handleNewMovieImageChange} />
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
          {/* '삭제' 팝업 창 */}
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>영화 삭제</DialogTitle>
            <DialogContent>
              {selectedMovie}를 삭제하시겠습니까?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="primary">
                아니오
              </Button>
              <Button onClick={handleDeleteClick} color="primary">
                예
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Fade>
  );
}

export default SelectionPage;