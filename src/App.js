import React from 'react';
import { Container, CssBaseline, Paper, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectionPage from "./screens/SelectionPage";
import MainPage from "./screens/MainPage";
import AdminPage from './screens/AdminPage';
import Admin from './screens/Admin';

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>
          <Router>
            <Switch>
              {/* 루트 경로에 대한 라우트를 MainPage로 설정 */}
              <Route path="/" exact component={MainPage} />
              <Route path="/Selection" component={SelectionPage} />
              <Route path="/AdminPage" component={AdminPage} />
              <Route path="/Admin" component={Admin} />
            </Switch>
          </Router>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
