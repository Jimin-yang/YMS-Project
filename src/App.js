// App.js
import React from 'react';
import { Container, CssBaseline, Paper, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectionPage from "./screens/SelectionPage";
import MainPage from "./screens/MainPage";
import AdminPage from './screens/AdminPage';
import Admin from './screens/Admin';
import MovieDetailsPage from './screens/MovieDetailsPage';
import CinemaSeat from './screens/CinemaSeat';
import { useStyles } from './styles';

const theme = createMuiTheme({
  typography: {
    h1: { fontWeight: 'bold' },
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white',
    },
  },
  palette: {
    primary: {main: '#ff1744'},
    secondary: {
      main: '#118e16',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>
          <Router>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/Selection" component={SelectionPage} />
              <Route path="/AdminPage" component={AdminPage} />
              <Route path="/Admin" component={Admin} />
              <Route path="/MovieDetailsPage" component={MovieDetailsPage} />
              <Route path="/CinemaSeat" component={CinemaSeat} />
              <Route path="/SelectionPage" component={SelectionPage} /> {/* SelectionPage.js를 실행하는 Route를 추가합니다. */}
            </Switch>
          </Router>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;