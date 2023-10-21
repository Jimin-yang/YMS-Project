import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  content: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Admin() {
  const classes = useStyles();
  const history = useHistory();

  const handleAddClick = () => {
    history.push({
      pathname: '/Selection',
      state: { isAdmin: true, isDeleting: false },
    });
  };

  const handleDeleteClick = () => {
    history.push({
      pathname: '/Selection',
      state: { isAdmin: true, isDeleting: true },
    });
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        관리자 페이지
      </Typography>
      <Box className={classes.content}>
        <Typography variant="body1">
          Welcome to the admin page. You can manage your application here.
        </Typography>
        <Button variant="contained" color="secondary" className={classes.button} onClick={handleAddClick}>
          추가
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleDeleteClick}>
          삭제
        </Button>
      </Box>
    </Container>
  );
}
export default Admin;