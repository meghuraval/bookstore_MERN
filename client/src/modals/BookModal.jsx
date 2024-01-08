/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "../utils/context/BookContext";

function BookModal({ book, onClose }) {
  const navigate = useNavigate();
  const { isAuthenticatedNavbar } = useContext(BookContext);

  const handleBuyNow = () => {
    if (!isAuthenticatedNavbar) {
      navigate("/Signin");
      alert("You must be logged in to purchase a new book");
    } else {
      navigate("/BuyNow", { state: { book } });
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white max-w-3xl w-[70%] mx-auto rounded-[3%] p-8 h-[800px]">
        <div className="flex mb-4">
          <button onClick={onClose}>Close</button>
          <button className="ml-auto" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
        <h2 className="text-[25px] font-semibold text-center mb-5">
          {book.title}
        </h2>
        <div>
          <img
            className="w-full object-cover object-center mb-4 h-[400px]"
            src={book.pictureURL}
            alt={book.title}
            style={{ objectFit: "contain" }}
          />
          <p className="text-lg mb-4 mt-5 text-center text-[20px]">
            Description: {book.description}
          </p>
          <p className="text-gray-700 text-center text-[20px]">
            Author: {book.author}
          </p>
          <p className="text-green-700 text-center">
            Listed Price: ${book.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
