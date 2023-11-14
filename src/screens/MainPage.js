import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Box, Typography, Button } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { useStyles } from '../styles';

function MainPage() {
    const styles = useStyles();
    const history = useHistory();

    const handleAdminPage = () => {
        history.push('/AdminPage');
    };

    const handleSelectionPage = () => {
        history.push('/Selection');
    };

    return (
        <Card>
            <Box className={[styles.root, styles.lightgreen]} position="relative">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAdminPage}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        zIndex: '1',
                    }}
                >
                    관리자 전환
                </Button>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    onClick={handleSelectionPage}
                >
                    <Box className={[styles.main, styles.center]}>
                        <Typography component="h5" variant="h5" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                            환영합니다! <br />
                        </Typography>
                        <Typography component="h2" variant="h2" style={{ fontFamily: 'BMEULJIRO, sans-serif', textAlign: 'center' }}>
                            <br /> 오늘은 <br /> 어떤 영화를 볼까요? <br /> <br />
                        </Typography>
                        <TouchAppIcon className={styles.appIcon}></TouchAppIcon>
                        <Typography component="h6" variant="h6" style={{ fontFamily: 'BMEULJIRO, sans-serif', textAlign: 'center' }}>
                            <br /> 화면을 터치해주세요
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default MainPage;