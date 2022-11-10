const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const ChefUser = require("../models/ChefUser");

module.exports.order_list_get = async (req, res) => {
  res.render("chef/chefOrderListPage");
};
module.exports.order_get = async (req, res) => {};

module.exports.confirm_cooking_post = async (req, res) => {};
module.exports.confirm_ready_to_pickup_post = async (req, res) => {};
module.exports.order_status_get = async (req, res) => {};
