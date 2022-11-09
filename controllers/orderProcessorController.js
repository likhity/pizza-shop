const Order = require("../models/Order");
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const OrderProcessor = require("../models/OrderProcessor");

module.exports.new_orders_get = async (req, res) => {};
module.exports.accepted_orders_get = async (req, res) => {};
module.exports.finished_orders_get = async (req, res) => {};
module.exports.individual_new_order_get = async (req, res) => {};
module.exports.individual_accepted_order_get = async (req, res) => {};
module.exports.individual_finished_order_get = async (req, res) => {};

module.exports.accept_order_post = async (req, res) => {
  //hi
  // hello
};
module.exports.confirm_pickedup_post = async (req, res) => {};
module.exports.order_status_get = async (req, res) => {};
