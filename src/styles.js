// styles.js
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
        position: 'relative', // 부모에 상대 위치 설정
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
        fontSize: '20rem',
    },
    cardsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
    card: { margin: '10px 0'},
    space: {
        padding: 10,
    },
    media: { width: 200 },
    arrowButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
      },
    nextButton: {
        right: 0, // 버튼을 오른쪽으로 이동
    },
    prevButton: {
        left: 0, // 버튼을 왼쪽으로 이동
    },
}));
