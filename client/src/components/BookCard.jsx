/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../utils/context/BookContext";
import BookModal from "../modals/BookModal";

function BookCard({ book }) {
  const { selectedCard, toggleCardExpansion } = useContext(BookContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedByUsername, setUploadedByUsername] = useState("anonymous");

  console.log(uploadedByUsername);

  const handleCardClick = () => {
    toggleCardExpansion(book._id);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    toggleCardExpansion(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Book object received in BookCard:", book);
    const storedUsername = localStorage.getItem("uploadedByUsername");
    console.log(storedUsername);
    if (storedUsername) {
      setUploadedByUsername(storedUsername);
    }
  }, [book]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center ml-3">
        <div className="px-4 mb-4" key={book._id}>
          <div
            className={`max-w-[250px] h-[200px] bg-white shadow-lg rounded-md overflow-hidden hover:scale-105 transition duration-200 my-5 mx-5 cursor-pointer ${
              selectedCard === book._id ? "h-100px" : "h-48"
            }`}
            onClick={handleCardClick}
          >
            <div className="">
              {book.pictureURL && (
                <img
                  className="h-48 w-full object-cover object-center"
                  src={book.pictureURL}
                  alt={book.title}
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="p-5">
                <h2 className="text-sm text-wrap font-semibold mb-2 text-center">
                  {book.title}
                </h2>
                <p className="text-sm text-green-700">
                  Listed price: ${book.price}
                </p>
                <p>Uploaded By: {uploadedByUsername}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <BookModal book={book} onClose={closeModal} />}
    </div>
  );
}

export default BookCard;
