/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

export const MyBooks = () => {
  const userId = localStorage.getItem("userName"); // Retrieve userId from localStorage or context
  const [userBooks, setUserBooks] = useState([]);

  const fetchUserBooks = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/books/user/${userId}`
      );
      setUserBooks(response.data);
    } catch (error) {
      console.log("Error fetching user books:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserBooks();
    }
  }, [userId, fetchUserBooks]);

  return (
    <div className="books-container mt-5 px-5">
      <h1 className="text-2xl mb-3">My Books</h1>
      <div className="card-container flex flex-wrap gap-5">
        {userBooks.length === 0 ? (
          <p>No books added yet.</p>
        ) : (
          userBooks.map((book) => (
            <div
              className="card border rounded-md shadow-md w-72"
              key={book._id}
            >
              <div className="card-header bg-gray-200 p-3 border-b">
                <h3 className="text-lg mb-2">{book.title}</h3>
                <p className="italic text-gray-600">{`By ${book.author}`}</p>
              </div>
              <div className="card-body p-3">
                <p className="mb-3">{book.description}</p>
                {/* Add more details or style as needed */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default MyBooks;
