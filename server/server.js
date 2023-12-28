const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bookRouter = require("../server/routes/bookRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.use("/books", bookRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
