const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes imports
const login = require("./routes/login");
const register = require("./routes/register");
const products = require("./routes/products");
const favorites = require("./routes/favorites");

const db = mongoose.connection;
const app = express();
const PORT = 3100;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(login);
app.use(register);
app.use(products);
app.use(favorites);
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// Mongoose
mongoose.connect("mongodb://localhost/mern-ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.once("open", () => {
  console.log("Connected to database");
});

// Default GET
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

// ---------- Server listening ---------
app.listen(PORT, () => {
  console.log(`Server started on Port: http://localhost:${PORT}`);
});
