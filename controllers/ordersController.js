const StudentUser = require("../models/StudentUser");
const OrderProcessor = require("../models/OrderProcessor");
const ChefUser = require("../models/ChefUser");
const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");

async function create_order_post(req, res) {
  try {
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

module.exports = {
  create_order_post,
};
