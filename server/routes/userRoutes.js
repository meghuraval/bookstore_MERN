const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const {
  signUpUser,
  updateUser,
  deleteUser,
  signInUser,
  getUserData,
} = require("../controller/userController");

router.post("/createuser", signUpUser);
router.post("/signin", signInUser);
router.get("/userdetails/:id", getUserData);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
