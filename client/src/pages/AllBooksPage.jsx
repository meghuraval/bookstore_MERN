// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchAllBooks() {
      try {
        const response = await axios.get(
          "http://localhost:3000/books/allbooks"
        );
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Author: {book.author}</p>
            {book.pictureURL && ( // Check if pictureURL exists
              <img src={book.pictureURL} alt={book.title}></img>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
