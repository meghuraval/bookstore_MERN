// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod);
      setPaymentError(null);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Card Details
          <CardElement />
        </label>
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {paymentError && <div>Error: {paymentError}</div>}
      {paymentSuccess && <div>Payment successful!</div>}
    </div>
  );
};

export default PaymentPage;
