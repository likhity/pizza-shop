const { Router } = require("express");
const orderProcessorController = require("../controllers/orderProcessorController");
const { requireOrderProcessorAuth } = require("../middleware/authMiddleware");

const router = Router();

/**
 * Auth middleware to check if user is authenticated
 * and that the user is an Order Processor
 */
router.use(requireOrderProcessorAuth);

// These routes render pages
 router.get("/new-orders", orderProcessorController.new_orders_get);
router.get("/accepted-orders", orderProcessorController.accepted_orders_get);
 router.get("/finished-orders", orderProcessorController.finished_orders_get);
 router.get("/individual-new-order/:orderID", orderProcessorController.individual_new_order_get);
//router.get("/individual-accepted-order/:orderID", orderProcessorController.individual_accepted_order_get);
// router.get("/individual-finished-order/:orderID", orderProcessorController.individual_finished_order_get);

/**
 * The following routes don't render pages. They are just
 * routes that the client uses to get current state
 * (like getting the order status) or change state (like
 * accepting an order or confirming an order has been picked up)
 */
router.post("/accept-order/:orderID", orderProcessorController.accept_order_post);
// router.post("/confirm-pickedup/:orderID", orderProcessorController.confirm_pickedup_post);
router.get("/order-status/:orderID", orderProcessorController.order_status_get);

module.exports = router;
