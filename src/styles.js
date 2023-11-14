import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    navy: {
        backgroundColor: '#003080',
    },
    lightgreen: {
        backgroundColor: '#445D48',
        color: '#ffffff',
    },
    main: {
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    green: {
        backgroundColor: '#D6CC99',
    },
    adminButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    adminLogin: {
        position: 'absolute',
        marginTop: '10px',
    },
    adminBox: {
        marginRight: '10px',
    },
    appIcon: {
        src: "images/logo.png",
        fontSize: '10rem',
    },
    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: { margin: 10 },
    space: {
        padding: 10,
    },
    media: { width: 200 },

    // 추가된 부분
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    movieCard: {
        marginBottom: '20px',
        height: '200px',
    },
    movieTitle: {
        marginBottom: '10px',
    },
    button: {
        marginRight: '10px',
    },
    arrowButton: {
        margin: '0 10px',
    },
}));

export const adminStyles = makeStyles({
    root: {
        marginTop: '20px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    movieCard: {
        marginBottom: '20px',
        height: '200px',
    },
    movieTitle: {
        marginBottom: '10px',
    },
    button: {
        marginRight: '10px',
    },
    arrowButton: {
        margin: '0 10px',
    },
});

export const adminpagesty = makeStyles((theme) => ({
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

  export const cinemaSeatStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
    seat: {
      padding: 0,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      flexGrow: 1,
      minWidth: '35px',
      width: '35px',
      height: '44px',
      fontSize: '16px',
    },
    buttonContainer: {
      marginTop: theme.spacing(10),
    },
    formControl: {
      minWidth: 120,
    },
    '@global': {
      '.MuiGrid-spacing-xs-3 > .MuiGrid-item': {
        padding: '11px',
      },
    },
  }));
  export const paymentPageStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    title: {
      marginBottom: theme.spacing(4),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  }));