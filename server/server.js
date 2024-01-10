const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/Addbook",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.use("/books", bookRouter);
app.use("/user", userRouter);

app.get("/checkdbconnection", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({ connected: isConnected });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port " + process.env.PORT);
});
