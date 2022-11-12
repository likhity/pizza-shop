const Order = require("../models/Order"); // New Orders
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const OrderProcessor = require("../models/OrderProcessor");


//needs to pass neworders object to page rendering
module.exports.new_orders_get = async (req, res) => {

  //finds ALL orders of ORDER's database, sends results/errors, we render ejs page with that information
  Order.find()
  .then( (results) => {
    res.render("orderprocessor/NewOrdersPage", {arrayOfOrdersDB: results});
  })
  .catch( (errors) => {
    console.log("errors stuff");
    console.log(errors);
  })
};


module.exports.accepted_orders_get = async (req, res) => {
  res.render("orderprocessor/AcceptedOrdersPage.ejs");
};
module.exports.finished_orders_get = async (req, res) => {
  res.render("orderprocessor/FinishedOrdersPage");
};
module.exports.individual_new_order_get = async (req, res) => {
  res.render("orderprocessor/specificNewOrder");
};
module.exports.individual_accepted_order_get = async (req, res) => {
  res.render("orderprocessor/specificAcceptedOrder");
};
module.exports.individual_finished_order_get = async (req, res) => {
  res.render("orderprocessor/specificFinishedOrder");
};

module.exports.accept_order_post = async (req, res) => {
  try {
    const { orderID } = req.params;

    // get the new order from the database
    const newOrder = await Order.findOne({ orderID });

    // create new accepted order with the exact same order details
    const newAcceptedOrder = new AcceptedOrder({
      pickUpTime: newOrder.pickUpTime,
      orderID: newOrder.orderID,
      studentID: newOrder.studentID,
      pizzaType: newOrder.pizzaType,
      toppings: newOrder.toppings,
      specialInstructions: newOrder.specialInstructions,
    });

    //  save the new accepted order to the AcceptedOrders collection in the database
    await newAcceptedOrder.save();

    //  delete the order from the NewOrders list
    await Order.deleteOne({ orderID });

    //  send response to client
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
module.exports.confirm_pickedup_post = async (req, res) => {
  try {
    const { orderID } = req.body;

    const { asuID, pickUpTime, studentID, pizzaType, specialInstructions, toppings } = await AcceptedOrder.findOne({ orderID });

    const newOrder = new FinishedOrder({ asuID, pickUpTime, studentID, pizzaType, specialInstructions, toppings });

    await AcceptedOrder.deleteOne({ orderID });

    newOrder.save().then(() => {
      res.status(200).json({ success: true });
    });

  } catch (err) {
    res.status(400).json({ success: false });
  }
};
module.exports.order_status_get = async (req, res) => {
  try {
    const { orderID } = req.body;

    const order = await AcceptedOrder.findOne({ orderID });

    res.status(200).json({ success: true, status: order.orderStatus });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
