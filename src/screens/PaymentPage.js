import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { paymentPageStyles } from '../styles';

function PaymentPage() {
  const classes = paymentPageStyles();
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handlePayment = async () => {
    console.log(`Card Number: ${cardNumber}`);
    console.log(`Expiration Date: ${expirationDate}`);
    console.log(`Security Code: ${securityCode}`);
    
    // TODO: 부트페이 결제 코드를 추가

    // 결제가 완료되면 예매 완료 페이지로 이동
    history.push('/CompletePage');
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Payment Information
      </Typography>
      <TextField
        label="Card Number"
        variant="outlined"
        className={classes.input}
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <TextField
        label="Expiration Date (MM/YY)"
        variant="outlined"
        className={classes.input}
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <TextField
        label="Security Code"
        variant="outlined"
        className={classes.input}
        value={securityCode}
        onChange={(e) => setSecurityCode(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handlePayment}
      >
        Pay
      </Button>
    </Box>
  );
}

export default PaymentPage;
