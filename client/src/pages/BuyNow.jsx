// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BuyNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handlePayNow = () => {
    navigate("/PaymentPage");
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const totalPrice = book.price * quantity;

  return (
    <div>
      <h1 className="text-center mb-5"> Title: {book.title}</h1>
      <img
        className="h-[300px] w-[200px] flex m-auto rounded-lg"
        src={book.pictureURL}
        alt={book.title}
      />
      <div className="flex flex-row gap-x-[20px] ml-[360px]">
        <button onClick={handleDecrement}>-</button>

        <button onClick={handleIncrement}>+</button>
      </div>
      <p className="text-center my-4">Quantity: {quantity}</p>
      <p className="text-center my-4 text-[20px]">Total Price: ${totalPrice}</p>
      <p className="text-center my-4">Description: {book.description}</p>
      <p className="text-center my-4">Author: {book.author}</p>
      <p className="text-center my-4">Price: ${book.price}</p>
      <p className="cursor-pointer" onClick={handlePayNow}>
        Pay Now
      </p>
    </div>
  );
};

export default BuyNow;
