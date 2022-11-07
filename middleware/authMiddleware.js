const jwt = require("jsonwebtoken");
const StudentUser = require("../models/StudentUser");
const OrderProcessor = require("../models/OrderProcessor");
const ChefUser = require("../models/ChefUser");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check that jwt exists and is verified
  if (token) {
    await jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({ error: "Not Authenticated" });
        } else {
          const user =
            (await StudentUser.findById(decodedToken.id)) ||
            (await OrderProcessor.findById(decodedToken.id)) ||
            (await ChefUser.findById(decodedToken.id));
          res.locals.asuID = user.asuID;
          res.locals.username = user.username;
          res.locals.userType = user.constructor.modelName;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ error: "Not Authenticated" });
  }
};

module.exports = {
  requireAuth,
};
