import { Box, Card, CardContent, Fade, Typography, CardActionArea, CardMedia } from '@material-ui/core';
import React from 'react';
import {useStyles} from '../styles';

export default function SelectionPage() {
    const styles = useStyles();
    return (
        <Fade in={true}>
            <Box className={[styles.root, styles.navy]}>
                <Box className={[styles.main, styles.center]}>
                    <Typography variant="h3"
                    component="h3" className={styles.center} style={{ fontFamily: 'BMEULJIRO, sans-serif' }} 
                    gutterBottom
                    >
                        영화를 선택해주세요
                    </Typography>
                    <Box className={styles.cards}>
                        <Box className={styles.row}>
                            <Card className={[styles.card, styles.space]}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="The Shawshank Redemption"
                                        image=""
                                        className={styles.media}
                                    /> 
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            The Shawshank Redemption
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={[styles.card, styles.space]}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="The Godfather"
                                        image=""
                                        className={styles.media}
                                    /> 
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            The Godfather
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={[styles.card, styles.space]}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="The Dark Knight"
                                        image=""
                                        className={styles.media}
                                    /> 
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            The Dark Knight
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                        <Box className={styles.row}>
                            <Card className={[styles.card, styles.space]}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Inception"
                                        image=""
                                        className={styles.media}
                                    /> 
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            Inception
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={[styles.card, styles.space]}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="The Matrix"
                                        image=""
                                        className={styles.media}
                                    /> 
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            The Matrix
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={[styles.card, styles.space]}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Pulp Fiction"
                                        image=""
                                        className={styles.media}
                                    /> 
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            color="textPrimary"
                                            component="p"
                                        >
                                            Pulp Fiction
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fade>
    )
}
