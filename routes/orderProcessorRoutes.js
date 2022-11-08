const { Router } = require("express");
const orderProcessorController = require("../controllers/orderProcessorController");
const { requireOrderProcessorAuth } = require("../middleware/authMiddleware");

const router = Router();

// check order processor is authenticated for every request
router.use(requireOrderProcessorAuth);

// router.get("/new-orders", orderProcessorController.new_orders_get);
// router.get("/accepted-orders", orderProcessorController.accepted_orders_get);
// router.get("/finished-orders", orderProcessorController.finished_orders_get);
// router.get("/new-order/:orderID", orderProcessorController.new_order_get);
// router.get("/accepted-order/:orderID", orderProcessorController.accepted_order_get);
// router.get("/finished-order/:orderID", orderProcessorController.finished_order_get);

// router.post("/accept-order/:orderID", orderProcessorController.accept_order_post);
// router.post("/confirm-pickedup/:orderID", orderProcessorController.confirm_pickedup_post);
// router.get("/order-status/:orderID", orderProcessorController.order_status_get);

module.exports = router;
