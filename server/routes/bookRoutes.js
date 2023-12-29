const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const {
  addBook,
  retrieveBook,
  retrieveAllBooks,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

router.post("/add", addBook);
router.get("/book/:id", retrieveBook);
router.get("/allbooks", retrieveAllBooks);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

module.exports = router;
