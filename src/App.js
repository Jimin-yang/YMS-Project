import { Container, CssBaseline, Paper, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import SelectionPage from "./screens/SelectionPage";
import MainPage from "./screens/MainPage";

const theme = createMuiTheme({
  typograhpy: {
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
    <BrowserRouter>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper>
          <Route path="/" component={MainPage} exact={true}></Route> 
          <Route path="/Selection" component={SelectionPage} exact={true}></Route>
        </Paper>
      </Container>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
