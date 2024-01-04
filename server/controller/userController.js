const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");

const signUpUser = async (req, res) => {
  const { email, password, username, reEnterPassword } = req.body;

  // Check if password and re-entered password match
  if (password !== reEnterPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new User instance
    const newUser = new User({
      email,
      password,
      username,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json(newUser);
    console.log("new user succesfully created");
    // Respond with the newly created user
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
  //route for this will be "http://localhost:3000/user/createuser"
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the user's password
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "token", { expiresIn: "1h" });

    // If the password matches, user is authenticated successfully
    res.json({
      token,
      _id: user._id,
      userName: user.username,
      message: "User authenticated successfully",
    });
    console.log("user authenticated successfully");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
  // Route for this will be "http://localhost:3000/user/signin"
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, username } = req.body;

  try {
    // Find the user by ID and update the fields
    const user = await User.findByIdAndUpdate(
      id,
      { email, password, username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Respond with the updated user
    console.log("user succesfully updated");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
  //route for this will be "http://localhost:3000/user/:id"
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all books associated with the user's ID
    const userBooks = await Book.find({ addedBy: id });

    // Delete the found books
    await Book.deleteMany({ addedBy: id });

    // Delete the user by ID
    await User.findByIdAndDelete(id);

    res.json({
      message: "User and associated books deleted successfully",
      userBooks,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
  // Route for this will be "http://localhost:3000/user/:id"
};

const getUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json({
      username: user.username,
      email: user.email,
      password: user.password,
      _id: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
  //route for this will be "http://localhost:3000/user/userdetails/:id"
};

module.exports = {
  signUpUser,
  signInUser,
  updateUser,
  deleteUser,
  getUserData,
};
