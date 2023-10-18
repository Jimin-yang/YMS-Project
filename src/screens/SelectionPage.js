// SelectionPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Fade } from '@material-ui/core';
import { useStyles } from '../styles';

function SelectionPage() {
  const styles = useStyles();
  const history = useHistory();

  const movies = [
    { title: 'The Shawshank Redemption', image: 'path_to_image1' },
    { title: 'The Godfather', image: 'path_to_image2' },
    { title: 'The Dark Knight', image: 'path_to_image3' },
    { title: 'Inception', image: 'path_to_image4' },
    { title: 'The Matrix', image: 'path_to_image5' },
    { title: 'Pulp Fiction', image: 'path_to_image6' },
  ];

  const handleMovieClick = (movieTitle) => {
    // 클릭한 영화의 제목을 상태로 함께 넘겨줌
    history.push({
      pathname: '/MovieDetailsPage',
      state: { movieTitle },
    });
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navy]}>
        <Box className={[styles.main, styles.center]}>
          <Typography variant="h3" component="h3" className={styles.center} style={{ fontFamily: 'BMEULJIRO, sans-serif' }} gutterBottom>
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
