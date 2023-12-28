const express = require("express");
const Book = require("../models/bookModel");
const {
  addBook,
  retrieveBook,
  updateBook,
} = require("../controller/bookController");

const router = express.Router();

router.post("/add", addBook);
router.get("/book/:id", retrieveBook);
router.put("/book/:id", updateBook);

module.exports = router;
