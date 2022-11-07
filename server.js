const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");

// database connection
const dbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xwddugt.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`;
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("home");
});
app.use(authRoutes);
app.use(orderRoutes);
