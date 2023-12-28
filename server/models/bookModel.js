const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  author: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
