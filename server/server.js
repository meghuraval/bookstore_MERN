const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bookRouter = require("../server/routes/bookRoutes");
const userRouter = require("../server/routes/userRoutes");
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

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
