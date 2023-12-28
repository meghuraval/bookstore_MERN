const Book = require("../models/bookModel");

const addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const newBook = new Book({
      title,
      author,
      description,
    });

    const savedBook = await newBook.save();
    res.status(200).json("Book saved succesfully" + savedBook);
  } catch (error) {
    console.log(error).status(400);
  }
  //path for this is "http://localhost:3000/books/add"
};

const retrieveBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      return res.status(404).json("Book not found");
    }
    res.status(200).json(foundBook);
  } catch (error) {
    res.status(400).json("Error fetching the book");
  }
  //path for this is "http://localhost:3000/books/book/:id"
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, description } = req.body;

    console.log("Book ID:", bookId);
    console.log("Updated data:", { title, author, description });

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, description },
      { new: true }
    );

    console.log("Updated book:", updatedBook); // Check if the book is updated

    if (!updatedBook) {
      return res.status(404).json("Book not found");
    }

    return res.status(200).json(updatedBook); // Return the updated book
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json("Error updating the book");
  }
};

//path for this is "http://localhost:3000/books/book/:id"

module.exports = {
  addBook,
  retrieveBook,
  updateBook,
};
