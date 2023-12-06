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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // 여기에 스타일 클래스들을 정의하세요...
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
      const { movieTitle, theater, time } = selectedShowing;
  
      if (movieTitle === '새 영화 추가' && !isDeleting) {
        setOpenAdd(true);
      } else {
        // 여기에서 Payment 정보를 서버에 전송
        axios.post('http://localhost:3001/api/payment', {
          movieTitle,
          theater,
          time,
        })
        .then(response => {
          console.log(response.data.message);
          // Payment 정보가 성공적으로 서버에 전송되면 다음 페이지로 이동 또는 추가적인 작업 수행
        })
        .catch(error => {
          console.error('Error sending payment information: ', error);
        });
      }
    }
  };
  
  
  
  return (
    <Box className={classes.cards}>
      <Box className={classes.main}>
        <Box className={classes.cards}>
          {showings.map((showing) => (
            <Card
              key={showing.id}
              className={`${classes.card} ${showing.movieTitle === '새 영화 추가' ? classes.adminButton : ''}`}
              onClick={() => handleMovieClick(showing.id)}
            >
              <CardActionArea>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <CardMedia
                      className={classes.media}
                      title={showing.movieTitle}
                      image={showing.movieImage}
                    />
                    <img
                      src={showing.movieImage}
                      alt={showing.movieTitle}
                      className={classes.movieImage}
                      style={{ width: '200px', height: 'auto' }} // 이미지 크기 조정 스타일 적용
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent className={classes.cardContent}>
                      <div className={classes.flexContainer}>
                        <div>
                          <Typography gutterBottom variant="h6" component="h2">
                            {showing.movieTitle}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {`상영관: ${showing.theater}`}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {`상영시간: ${showing.time}`}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SelectionPage;