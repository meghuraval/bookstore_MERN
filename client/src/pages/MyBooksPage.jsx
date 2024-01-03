/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";

export const MyBooks = () => {
  const { userId } = useContext(BookContext); // Retrieve userId from localStorage or context
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/books/user/${userId}`
        );
        setUserBooks(response.data);
      } catch (error) {
        console.log("Error fetching user books:", error);
      }
    };

    if (userId) {
      fetchUserBooks();
    }
  }, [userId]);

  return (
    <div>
      <h1>My Books</h1>
      {userBooks.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <ul>
          {userBooks.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MyBooks;
