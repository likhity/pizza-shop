const jwt = require("jsonwebtoken");
const StudentUser = require("../models/StudentUser");
const OrderProcessor = require("../models/OrderProcessor");
const ChefUser = require("../models/ChefUser");
require("dotenv").config();

const requireStudentAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check that jwt exists and is verified
  if (token) {
    await jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/student/login");
        } else {
          const user = await StudentUser.findById(decodedToken.id);
          if (!user) {
            res.redirect("/student/login");
          } else {
            res.locals.asuID = user.asuID;
            next();
          }
        }
      }
    );
  } else {
    res.redirect("/student/login");
  }
};

const requireOrderProcessorAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check that jwt exists and is verified
  if (token) {
    await jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/orderprocessor/login");
        } else {
          const user = await OrderProcessor.findById(decodedToken.id);
          if (!user) {
            res.redirect("/orderprocessor/login");
          } else {
            res.locals.username = user.username;
            next();
          }
        }
      }
    );
  } else {
    res.redirect("/orderprocessor/login");
  }
};

const requireChefAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check that jwt exists and is verified
  if (token) {
    await jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/chef/login");
        } else {
          const user = await ChefUser.findById(decodedToken.id);
          if (!user) {
            res.redirect("/chef/login");
          } else {
            res.locals.username = user.username;
            next();
          }
        }
      }
    );
  } else {
    res.redirect("/chef/login");
  }
};

module.exports = {
  requireStudentAuth,
  requireOrderProcessorAuth,
  requireChefAuth,
};
