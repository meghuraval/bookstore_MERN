const Book = require("../models/bookModel");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "mern-bookstore-gcp",
  keyFilename: "mern-bookstore-gcp-dfb464dd6600.json",
});

const addBook = async (req, res) => {
  try {
    const userId = req.body.userId;
    const uploadedByUsername = req.body.uploadedByUsername;
    const { title, author, description, price } = req.body;
    const pictureFile = req.file;

    // Validate if a picture file is uploaded
    if (!pictureFile) {
      return res.status(400).send("No file uploaded");
    }

    const { Storage } = require("@google-cloud/storage");
    const storage = new Storage({
      projectId: "mern-bookstore-gcp",
      keyFilename: "mern-bookstore-gcp-dfb464dd6600.json",
    });

    const bucket = storage.bucket("bookstore-images-storage");
    const fileName = `book_${Date.now()}.png`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: pictureFile.mimetype,
      },
      resumable: false,
    });

    blobStream.on("error", (error) => {
      console.log("Error uploading to GCP:", error);
      return res.status(500).send("Error uploading to GCP");
    });

    blobStream.on("finish", async () => {
      const pictureURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      const newBook = new Book({
        title,
        author,
        description,
        price,
        pictureURL,
        addedBy: userId,
        uploadedByUsername,
      });

      try {
        const savedBook = await newBook.save();
        res.status(200).json("Book saved successfully" + savedBook);
      } catch (error) {
        console.log(error);
        return res.status(500).send("Error saving book");
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).send("Server Error Encountered");
  }
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

const retrieveAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json("No books found");
    }
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
  }
  //path for this is "http://localhost:3000/books/allbooks"
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, description, price } = req.body;

    console.log("Book ID:", bookId);
    console.log("Updated data:", { title, author, description, price });

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, description, price },
      { new: true }
    );

    console.log("Updated book:", updatedBook);

    if (!updatedBook) {
      return res.status(404).json("Book not found");
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json("Error updating the book");
  }
  //path for this is "http://localhost:3000/books/book/:id"
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      return res.status(404).json("Book not found");
    }

    await Book.findByIdAndDelete(bookId);

    res.status(200).json("Book successfully deleted");
  } catch (error) {
    res.status(400).json("Error fetching the book");
  }
  //path for this is "http://localhost:3000/books/book/:id"
};

const getUserBooks = async (req, res) => {
  const userId = req.params.userId;
  console.log("User ID:", userId);

  try {
    const userBooks = await Book.find({ uploadedByUsername: userId });
    if (!userBooks || userBooks.length === 0) {
      return res.status(404).json({ error: "User has not aded any books yet" });
    }

    res.status(200).json(userBooks);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
  //path for this is "http://localhost:3000/books/user/:userId"
};

module.exports = {
  addBook,
  retrieveBook,
  updateBook,
  deleteBook,
  retrieveAllBooks,
  getUserBooks,
};
