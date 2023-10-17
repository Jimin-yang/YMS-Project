import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // useHistory를 import 합니다.
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button } from '@material-ui/core';

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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AdminPage() {
  const classes = useStyles();
  const history = useHistory(); // useHistory hook을 사용하여 history 객체를 가져옵니다.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your own admin username and password
    if (username === 'admin' && password === 'admin') {
      history.push('/Admin'); // 로그인 성공 후 '/Admin' 경로로 이동합니다.
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Admin Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}

export default AdminPage; // AdminPage 컴포넌트를 한 번만 export