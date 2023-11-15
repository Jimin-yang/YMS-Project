import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: '50%',
  },
  errorMessage: {
    color: 'red',
    marginTop: theme.spacing(2),
  },
}));

function AdminPage() {
  const classes = useStyles();
  const history = useHistory();
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  };

  const handlePinInput = (input) => {
    switch (input) {
      case 'DEL':
        if (pin === '') {
          history.push('/');
        } else {
          setPin(pin.slice(0, -1));
        }
        break;
      case 'CONFIRM':
        if (pin === '4789') {
          history.push('/Admin');
        } else {
          handleErrorMessage('비밀번호가 일치하지 않습니다.');
          setPin('');
        }
        break;
      default:
        setPin(pin + input);
        break;
    }
  };

  useEffect(() => {
    if (errorMessage) {
      handleErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  return (
    <Container className={classes.root}>
      <Typography variant="h2">Admin Login</Typography>
      <Grid container direction="column" className={classes.buttonContainer}>
        <Grid item container justify="center">
          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handlePinInput(num.toString())}
            >
              {num}
            </Button>
          ))}
        </Grid>
        <Grid item container justify="center">
          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handlePinInput(num.toString())}
            >
              {num}
            </Button>
          ))}
        </Grid>
        <Grid item container justify="center">
          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handlePinInput(num.toString())}
            >
              {num}
            </Button>
          ))}
        </Grid>
        <Grid item container justify="center">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => handlePinInput('DEL')}
          >
            ◀
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handlePinInput('0')}
          >
            0
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handlePinInput('CONFIRM')}
          >
            확인
          </Button>
        </Grid>
      </Grid>
      {errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
    </Container>
  );
}

export default AdminPage;