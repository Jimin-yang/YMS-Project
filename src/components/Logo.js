import React from 'react'
import { StylesProvider } from '@material-ui/core/styles';
import {useStyles} from '../styles';

export default function Logo() {
    const styles = useStyles();
  return (
    <img
        src="images/logo.png"
        alt="Food Order"
        className={StylesProvider.largeLogo}
        style={{ 
            objectFit: 'contain', 
            width: '25%', 
            height: '60%',
            margin: '10px 0px 0px -100px', 
        }} 
    ></img>
  )
}
