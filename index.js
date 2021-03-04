const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const path = require("path");

// Routes imports
const login = require("./routes/login");
const register = require("./routes/register");
const products = require("./routes/products");
const favorites = require("./routes/favorites");
const orders = require("./routes/orders");
const categories = require("./routes/categories");
const user = require("./routes/user");
const logout = require("./routes/logout");

// DOTENV Files
require("dotenv").config();

// Config variables
const PORT = process.env.PORT || 3100;
const cookieMaxAge = 3600 * 24; // 24 Hours
const dbString = process.env.MONGO_ATLAS;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const connection = mongoose.createConnection(dbString, dbOptions);

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
      httpOnly: true,
      sameSite: true,
      path: "/",
    },
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use(login);
app.use(register);
app.use(products);
app.use(favorites);
app.use(categories);
app.use(user);
app.use(logout);
app.use(orders);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.listen(PORT, () => {
  console.log("Server started on port: http://localhost:" + PORT);
});
