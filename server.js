const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes imports
const login = require("./routes/login");
const register = require("./routes/register");

const db = mongoose.connection;
const app = express();
const PORT = 3100;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(login);
app.use(register);

app.get("/", (req, res) => {
  res.send("working");
});

// Mongoose
mongoose.connect("mongodb://localhost/mern-ecommerce", {
  useNewUrlParser: true,
});

db.once("open", () => {
  console.log("Connected to database");
});

// ---------- Server listening ---------
app.listen(PORT, () => {
  console.log(`Server started on Port: http://localhost:${PORT}`);
});
