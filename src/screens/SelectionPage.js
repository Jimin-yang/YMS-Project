import React, { useState, useEffect } from 'react';
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
    if (movieTitle === '새 영화 추가' && !isDeleting) {
      setOpenAdd(true);
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

  return (
    <Box className={classes.root}>
      <Box className={classes.main}>
        {/* 더 많은 컴포넌트 및 컨텐츠 추가... */}
        {/* 예시로 "새 영화 추가" 카드 하나만 추가하였습니다. */}
        <Box className={classes.cards}>
          {movies.map((movie) => (
            <Card
              key={movie.title}
              className={`${classes.card} ${movie.title === '새 영화 추가' ? classes.adminButton : ''}`}
              onClick={() => handleMovieClick(movie.title)}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={movie.image}
                  title={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`Theater: ${movie.theater}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`Time: ${movie.time}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        {/* 더 많은 컴포넌트 및 컨텐츠 추가... */}
      </Box>
    </Box>
  );
};

export default SelectionPage;
