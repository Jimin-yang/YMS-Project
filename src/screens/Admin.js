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
  CardActions,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  updateButton: {
    position: 'absolute',
    top: '30px',
    right: '30%',
    borderRadius: '20px',
    padding: '5px 10px',
    fontSize: '14px',
    fontWeight: 'bold',
    zIndex: '1',
  }, 
}));

const Admin = () => {
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

  const fetchData = () => {
    axios.get('http://localhost:3001/api/selection-data')
      .then(response => {
        setShowings(response.data);
      })
      .catch(error => {
        console.error('Error fetching selection data: ', error);
      });
  };
  
  useEffect(() => {
    fetchData();
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

  const handleDeleteMovie = (showingId, externalModule) => {
    axios.delete(`http://localhost:3001/api/movies/${showingId}`)
    .then(response => {
      console.log(`Movie with ID ${showingId} deleted successfully.`);
    })
    .catch(error => {
      console.error(`Error deleting movie with ID ${showingId}:`, error);
    });
  };

  const handleUpdate = async (showingId) => {
    const updatedData = {}; // 원하는 값을 할당하세요.
  
    try {
      const response = await axios.put(`http://localhost:3001/api/movies/${showingId}`, updatedData);
      console.log(`Movie with ID ${showingId} updated successfully.`);
      // 업데이트 성공시 처리
  
      // 데이터를 다시 받아오는 함수 호출
      fetchData();
    } catch (error) {
      console.error(`Error updating movie with ID ${showingId}:`, error);
      // 에러 발생시 처리
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
                        <CardActions>
                          <Button size="small" color="secondary" onClick={() => handleDeleteMovie(showing.id)}>
                            삭제
                          </Button>
                        </CardActions>
                      </div>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleUpdate(selectedMovie)}
          className={classes.updateButton}
        >
          업데이트
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;