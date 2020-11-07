const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

// Routes imports
const login = require("./routes/login");
const register = require("./routes/register");
const products = require("./routes/products");
const favorites = require("./routes/favorites");
const categories = require("./routes/categories");
const user = require("./routes/user");
const logout = require("./routes/logout");

// Config variables
const PORT = process.env.PORT || 3100;
const cookieMaxAge = 1000 * 60 * 60 * 24; // 24 Hours
const dbString = "mongodb://localhost/mern-ecommerce";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const connection = mongoose.createConnection(dbString, dbOptions);

// DOTENV Files
require("dotenv").config();

const app = express();

const db = mongoose.connection;
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

try {
  mongoose.connect(dbString, dbOptions);
} catch (err) {
  console.log(err);
}

db.once("open", () => console.log("Connected to db"));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: cookieMaxAge,
      httpOnly: false,
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(login);
app.use(register);
app.use(products);
app.use(favorites);
app.use(categories);
app.use(user);
app.use(logout);

app.listen(PORT, () => {
  console.log("Server started on port: http://localhost:" + PORT);
});
