/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../utils/context/BookContext";
import BookModal from "../modals/BookModal";
import "../App.css";

function BookCard({ book }) {
  const { selectedCard, toggleCardExpansion } = useContext(BookContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedByUsername, setUploadedByUsername] = useState();
  const handleCardClick = () => {
    toggleCardExpansion(book._id);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setUploadedByUsername(book.uploadedByUsername);
  }, [book.uploadedByUsername]);

  const closeModal = () => {
    toggleCardExpansion(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-[250px] h-[250px]">
        <div className="px-4 mb-4" key={book._id}>
          <div
            className={`max-w-[250px] h-[200px] bg-white shadow-lg rounded-md overflow-hidden hover:scale-105 transition duration-200 my-5 mx-5 cursor-pointer ${
              selectedCard === book._id ? "h-100px" : "h-48"
            }`}
            onClick={handleCardClick}
          >
            <div className="">
              <div className="">
                {book.pictureURL && (
                  <img
                    className="bookcard-image"
                    src={book.pictureURL}
                    alt={book.title}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="p-5 bookcard-details">
                <h2
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                  className="text-sm text-wrap font-semibold mb-2 text-center"
                >
                  {book.title}
                </h2>
                <p
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                  className="text-[15px] text-green-700 text-center"
                >
                  Price: ${book.price}
                </p>
              </div>
            </div>
          </div>
          <p style={{ fontFamily: "'Roboto', sans-serif" }} className="ml-5">
            Uploaded By:{" "}
            <span className="text-blue-500">{uploadedByUsername}</span>
          </p>
        </div>
      </div>
      {isModalOpen && <BookModal book={book} onClose={closeModal} />}
    </div>
  );
}

export default BookCard;
