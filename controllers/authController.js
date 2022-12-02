import StudentUser from "../models/StudentUser.js";
import OrderProcessor from "../models/OrderProcessor.js";
import ChefUser from "../models/ChefUser.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

const student_login_get = async (req, res) => {
  res.render("login/student_login");
};

const student_login_post = async (req, res) => {
  const { asuID } = req.body;
  
  try {
    const student = await StudentUser.login(asuID);
    const token = createToken(student._id);
    res.cookie("jwt", token, { maxAge: jwtMaxAge * 1000, httpOnly: true });
    res.status(200).json({ user: student._id });
  } catch (err) {
    console.log(err);
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const orderprocessor_login_get = async (req, res) => {
  res.render("login/orderprocessor_login");
};

const orderprocessor_login_post = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await OrderProcessor.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: jwtMaxAge * 1000, httpOnly: true });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const chef_login_get = async (req, res) => {
  res.render("login/chef_login");
};

const chef_login_post = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await ChefUser.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: jwtMaxAge * 1000, httpOnly: true });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

export default {
  student_login_post,
  student_login_get,
  orderprocessor_login_get,
  orderprocessor_login_post,
  chef_login_get,
  chef_login_post,
  logout
};