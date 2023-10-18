// FILEPATH: /c:/Users/kimmi/Desktop/YMS/src/screens/AdminPage.js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

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
}));

export default function AdminPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Admin Page
      </Typography>
      <Typography variant="body1">
        Welcome to the admin page. You can manage your application here.
      </Typography>
    </Container>
  );
}