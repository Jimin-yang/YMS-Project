import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 9999,
  },
}));

const Admin = () => {
  const classes = useStyles();
  const history = useHistory();

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

  const handleMovieUpdate = (showingId, movieTitle) => {
    // 수정 버튼 클릭 시 무비 디테일즈 페이지로 이동합니다.
    history.push({
      pathname: `/MovieDetailsPage/${showingId}`,
      state: { movieTitle, isAdmin: true }
    });
  };
  const handleGoBack = () => {
    // 첫 화면으로 이동
    history.push('/');
  };

  return (
    <Box className={classes.cards}>
      <div className="MuiContainer-root MuiContainer-maxWidthSm" style={{ position: 'relative' }}>
      <Button variant="contained" color="primary" className={classes.backButton} onClick={handleGoBack}>
        되돌아가기
      </Button>
      </div>
      <Box className={classes.main}>
        <Box className={classes.cards}>
          {showings.map((showing) => (
            <Card
              key={showing.id}
              className={`${classes.card} ${showing.movieTitle === '새 영화 추가' ? classes.adminButton : ''}`}
            >
              <CardActionArea onClick={() => handleMovieUpdate(showing.id, showing.movieTitle)}>
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
                      style={{ width: '200px', height: 'auto' }}
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

export default Admin;