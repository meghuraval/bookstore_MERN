// BuyNow.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handlePayNow = () => {
    if (book) {
      navigate("/PaymentPage", { state: { book } });
    } else {
      console.log("This didn't work");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  React.useEffect(() => {
    if (location.state && location.state.book) {
      setBook(location.state.book);
    } else {
      // Handle the case when the book data is not available in the state
      navigate("/"); // Redirect to the homepage or handle appropriately
    }
  }, [location.state, navigate]);

  if (!book) {
    return null; // or render a loading spinner or message
  }

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
