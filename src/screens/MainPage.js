import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardActionArea, Box, Typography, Button, TextField } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import {useStyles} from '../styles'; 

function MainPage() {
    const styles = useStyles();
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const correctPassword = 'admin123'; // 비밀번호를 설정합니다.

    const handleAdminClick = (event) => {
        event.stopPropagation(); // 이벤트 버블링을 막습니다.
        history.push('/AdminPage');
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLoginClick = () => {
        if (password === correctPassword) {
            setIsAdmin(true);
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }

    if (isAdmin) {
        // 관리자 모드
        return (
            <div>
                <h1>관리자 모드</h1>
                <Box className={styles.adminBox}>
                    <TextField label="비밀번호" type="password" value={password} onChange={handlePasswordChange}></TextField>
                    <Button variant="contained" color="primary" onClick={handleLoginClick} className={styles.adminLogin}>
                        로그인
                    </Button>
                </Box>
            </div>
        )
    }

    // 일반 페이지
    return (
        <Card>
            <CardActionArea onClick={() => history.push('/Selection')}>
                <Box className={[styles.root, styles.lightgreen]}>
                    <Box className={[styles.main, styles.center]}>
                        <Button variant="contained" color="primary" onClick={handleAdminClick} className={styles.adminButton}>
                            관리자 전환 
                        </Button>
                        <Typography componet="h5" variant="h5" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                            환영합니다! <br />
                        </Typography>
                        <Typography componet="h2" variant="h2" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                            <br /> 오늘은 <br /> 어떤 영화를 볼까요? <br /> <br />
                        </Typography>
                        <TouchAppIcon className={styles.appIcon}></TouchAppIcon>
                        <Typography componet="h6" variant="h6" style={{ fontFamily: 'BMEULJIRO, sans-serif' }}>
                           <br /> 화면을 터치해주세요
                        </Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default MainPage; // MainPage 컴포넌트를 한 번만 export