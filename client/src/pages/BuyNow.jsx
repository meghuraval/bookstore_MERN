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
      <h1 className="text-center mb-5 text-3xl"> Buy Now </h1>
      <img
        className="h-[300px] w-[250px] flex m-auto rounded-lg"
        src={book.pictureURL}
        alt={book.title}
      />
      <p className="text-center my-4 text-[20px]">Total Price: ${totalPrice}</p>
      <div className="flex flex-row gap-x-[20px] ml-[340px]">
        <button
          className="bg-slate-400 py-1 px-2 rounded-lg border border-gray-500"
          onClick={handleDecrement}
        >
          -
        </button>
        <button
          className="bg-slate-400 py-1 px-2 rounded-lg border border-gray-500"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <p className="text-center my-4">Quantity: {quantity}</p>
      <h1 className="text-center mb-5"> Title: {book.title}</h1>
      <p className="text-center my-4">Price: ${book.price}</p>
      <button
        className="bg-blue-500 py-3 px-3 rounded-lg text-white hover:scale-105 transition duration-200 cursor-pointer flex m-auto"
        onClick={handlePayNow}
      >
        Pay Now
      </button>
    </div>
  );
};

export default BuyNow;
