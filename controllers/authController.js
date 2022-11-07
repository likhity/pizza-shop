const StudentUser = require("../models/StudentUser");
const OrderProcessor = require("../models/OrderProcessor");
const ChefUser = require("../models/ChefUser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // incorrect ASU ID
  if (err.message === "Your ASURITE ID is incorrect") {
    return err.message;
  }

  // incorrect email or password login
  if (err.message === "Either your password or username is incorrect") {
    return err.message;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// A JWT is valid for 3 days since first creation
const jwtMaxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: jwtMaxAge });
};

module.exports.login = async (req, res) => {
  const { userType, asuID, username, password } = req.body;
  let user;
  try {
    switch (userType) {
      case "student":
        user = await StudentUser.login(asuID);
        break;
      case "orderprocessor":
        user = await OrderProcessor.login(username, password);
        break;
      case "chef":
        user = await ChefUser.login(username, password);
        break;
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: jwtMaxAge * 1000, httpOnly: true });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
