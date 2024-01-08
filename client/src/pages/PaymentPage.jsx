// PaymentPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleGoBack = () => {
    navigate("/BuyNow", { state: { book } });
  };

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
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod);
    }
  };

  return (
    <div>
      <button className="mt-5 ml-10" onClick={handleGoBack}>
        Back
      </button>
      <h1 className="text-3xl text-center mb-10">Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <label className="ml-10">
          Card Details
          <CardElement className="ml-10 mr-10 py-5" />
        </label>
        <button
          className="bg-blue-500 py-2 px-4 rounded-lg text-white hover:scale-105 transition duration-200 flex m-auto mt-10"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {paymentSuccess && <div>Payment successful!</div>}
    </div>
  );
};

export default PaymentPage;
