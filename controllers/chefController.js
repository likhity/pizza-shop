const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const ChefUser = require("../models/ChefUser");

module.exports.order_list_get = async (req, res) => {
  res.render("chef/chefOrderListPage");
};
module.exports.order_get = async (req, res) => {
  res.render("chef/chefSpecificOrder");
};

module.exports.confirm_cooking_post = async (req, res) => {};
module.exports.confirm_ready_to_pickup_post = async (req, res) => {};
module.exports.order_status_get = async (req, res) => {
  try {
    const { orderID } = req.body;

    const order = await AcceptedOrder.findOne({ orderID });

    res.status(200).json({ success: true, status: order.orderStatus });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
