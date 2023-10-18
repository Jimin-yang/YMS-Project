// SelectionPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Fade, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStyles } from '../styles';

function SelectionPage() {
  const styles = useStyles();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]}>
        <Box className={styles.main}>
          <Typography variant="h3" component="h3" style={{ fontFamily: 'BMEULJIRO, sans-serif' }} gutterBottom>
            영화를 선택해주세요
          </Typography>
          <Box className={styles.cardsContainer}>
            {movies.slice(currentIndex, currentIndex + 3).map((movie, index) => (
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
          {movies.length > 3 && (
            <>
              <IconButton className={[styles.arrowButton, styles.nextButton]} onClick={handleNextClick}>
                <ArrowForwardIcon />
              </IconButton>
              <IconButton className={[styles.arrowButton, styles.prevButton]} onClick={handlePrevClick}>
                <ArrowBackIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Fade>
  );
}

export default SelectionPage;
