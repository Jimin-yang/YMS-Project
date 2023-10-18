import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardActionArea, Box, Typography } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { useStyles } from '../styles';

function MainPage() {
    const styles = useStyles();
    const history = useHistory();

    return (
        <Card>
            <CardActionArea onClick={() => history.push('/Selection')}>
                <Box className={[styles.root, styles.lightgreen]}>
                    <Box className={[styles.main, styles.center]}>
                        <Typography component="h5" variant="h5" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                            환영합니다! <br />
                        </Typography>
                        <Typography component="h2" variant="h2" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                            <br /> 오늘은 <br /> 어떤 영화를 볼까요? <br /> <br />
                        </Typography>
                        <TouchAppIcon className={styles.appIcon}></TouchAppIcon>
                        <Typography component="h6" variant="h6" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                           <br /> 화면을 터치해주세요
                        </Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default MainPage;