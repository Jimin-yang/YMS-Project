import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    initialCenter: {
        transform: 'translateX(calc(50% + 50px))', // 이 값은 조절해보세요
    },
      
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
    card: { margin: 10},
    space: {
        padding: 10,
    },
    media: { width: 200 },
})) 