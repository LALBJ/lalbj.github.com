const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

const authRoute = require("./routes/auth");
console.log("hello");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
