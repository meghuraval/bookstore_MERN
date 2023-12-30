// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

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
    <div className="flex flex-wrap flex-row">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
