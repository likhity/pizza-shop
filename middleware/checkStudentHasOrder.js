import Order from "../models/Order.js";
import AcceptedOrder from "../models/AcceptedOrder.js";

export default async (req, res, next) => {

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