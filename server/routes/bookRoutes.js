const express = require("express");
const router = express.Router();
const upload = require("../utils/multerMiddleWare");

const {
  addBook,
  retrieveBook,
  retrieveAllBooks,
  updateBook,
  deleteBook,
  getUserBooks,
} = require("../controller/bookController");

router.post("/add", upload.single("picture"), addBook);
router.get("/book/:id", retrieveBook);
router.get("/allbooks", retrieveAllBooks);
router.put("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);
router.get("/user/:userId", getUserBooks);

module.exports = router;
