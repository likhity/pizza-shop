import jwt from "jsonwebtoken";
import StudentUser from "../models/StudentUser.js";
import OrderProcessor from "../models/OrderProcessor.js";
import ChefUser from "../models/ChefUser.js";
import dotenv from "dotenv";
dotenv.config();

export const requireStudentAuth = async (req, res, next) => {
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

export const requireOrderProcessorAuth = async (req, res, next) => {
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

export const requireChefAuth = async (req, res, next) => {
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
