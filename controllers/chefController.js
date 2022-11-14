const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const ChefUser = require("../models/ChefUser");

module.exports.order_list_get = async (req, res) => {

  try {

    const acceptedOrdersList = await AcceptedOrder.find({"orderStatus": { $ne: "Ready to Pickup" }});

    res.render("chef/chefOrderListPage", { acceptedOrdersList });
  } catch (err) {
    res.status(400).json({ success: false });
  }

};
module.exports.individual_order_get = async (req, res) => {
  try {
  const thisOrderID = req.params.orderID;
  
  const order = await AcceptedOrder.findOne({ orderID: thisOrderID });

  res.render("chef/chefSpecificOrder", {specificOrder: order});

  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//============================= ORDER STATUS ======================================================

module.exports.confirm_ready_to_cook_post = async (req, res) => {
  try {
    const orderID = req.body.orderID;

    await AcceptedOrder.findOneAndUpdate({ orderID: orderID }, { orderStatus: "Ready to Cook" });

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(400).json({ sucess: false });
  }
}

module.exports.confirm_cooking_post = async (req, res) => {
  try {
    const { orderID } = req.body;

    await AcceptedOrder.findOneAndUpdate({ orderID }, { orderStatus: "Cooking" });

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports.confirm_ready_to_pickup_post = async (req, res) => {
  try {
    const { orderID } = req.body;

    await AcceptedOrder.findOneAndUpdate({ orderID }, { orderStatus: "Ready to Pickup" });

    res.status(200).json({ success: true });

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
