const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    contentType: String,
    data: Buffer,
  },
});

bookSchema.index({ title: 1, author: 1 }, { unique: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
