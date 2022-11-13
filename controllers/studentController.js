//schema requires
const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const StudentUser = require("../models/StudentUser");

const ShortUniqueId = require("short-unique-id");

module.exports.customize_pizza_get = (req, res) => {
  res.render("student/customizePizzaPage");
};

module.exports.pickup_time_get = (req, res) => {
  res.render("student/pickUpTimePage");
};

module.exports.order_summary_get = (req, res) => {
  res.render("student/orderSummaryPage");
};

module.exports.special_instructions_get = (req, res) => {
  res.render("student/specialInstructions");
};

module.exports.view_order_status_get = (req, res) => {
  res.render("student/orderStatusPage");
};

module.exports.create_order_post = async (req, res) => {
  try {
    const { pickUpTime, asuID, pizzaType, toppings, specialInstructions } =
      req.body;

    // every order will have a unique ID 10 characters long
    const orderID = new ShortUniqueId({ length: 10 })();

    //create order based off post request
    const newOrder = new Order({
      pickUpTime: pickUpTime,
      studentID: asuID,
      orderID: orderID,
      pizzaType: pizzaType,
      toppings: toppings,
      specialInstructions: specialInstructions,
    });
    //save order to database
    //return ok status success:true & orderID
    newOrder.save().then((result) => {
      console.log(result);
      res.status(201).json({ success: true, orderID });
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports.cancel_order_delete = async (req, res) => {
  try {
    const { orderID } = req.body;

    await Order.deleteOne({ orderID });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports.order_status_get = async (req, res) => {
  try {
    //we received orderID from client
    const { orderID } = req.params;

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    //try to find client's orderID in pending orders (order) database
    //or try to find in acceptedOrders
    const order =
      (await Order.findOne({ orderID })) ||
      (await AcceptedOrder.findOne({ orderID }));

    //we find order and check what collection it belongs to in the database

    //if belongs to acceptedOrder
    //send OK response (200) and json containing success = true and status from order
    if (order.constructor.modelName === "acceptedorder") {
      res.status(200).json({ success: true, status: order.orderStatus });
    } else {
      //else status is pending (order) and return json saying ok status
      //and success = true and status is not accepted (order sent)
      res.status(200).json({ success: true, status: "Order Sent" });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
