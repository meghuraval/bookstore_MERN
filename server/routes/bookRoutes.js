const express = require("express");
const Book = require("../models/bookModel");
const {
  addBook,
  retrieveBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

const router = express.Router();

router.post("/add", addBook);
router.get("/book/:id", retrieveBook);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

module.exports = router;
