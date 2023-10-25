import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Button, Form, Input } from 'antd';
import { stripePromise } from './stripeConfig';
import {PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const payment = () => {
    const stripe = loadStripe('pk_test_51NwEzzEjdrK5a8M75E48GFdH7AZQ4LftPzaLr1yoB22N6gsXtKeLPOS0KyEkBWrTqs5VENFM0PhvVVd6pqat7Hqw000XTDRHlE')
    const options = {
      // passing the client secret obtained from the server
      clientSecret: '{{CLIENT_SECRET}}',
    };
  
    const CheckoutForm = () => {
      return (
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      );
    };

    
  
    return (
        <Elements stripe={stripe} options={options} >
        <CheckoutForm />
      </Elements>
 
);
  };

export default payment