const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const Book = require("../models/bookModel");
const {
  addBook,
  retrieveBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

router.post("/add", upload.single("picture"), addBook);
router.get("/book/:id", retrieveBook);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

module.exports = router;
