const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const {
  signUpUser,
  updateUser,
  deleteUser,
  signInUser,
} = require("../controller/userController");

router.post("/createuser", signUpUser);
router.post("/signin", signInUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
