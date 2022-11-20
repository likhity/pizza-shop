const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");

module.exports = async (req, res, next) => {

  const { asuID: studentID } = res.locals;

  const order =
      (await Order.findOne({ studentID })) ||
      (await AcceptedOrder.findOne({ studentID }));
  
  if (order) {
    res.redirect("/student/view-order-status");
  } else {
    next();
  }
}