const { Router } = require("express");
const ordersController = require("../controllers/ordersController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.use(requireAuth);
router.post("/create-order", ordersController.create_order_post);
router.delete("/cancel-order", ordersController.cancel_order_delete);
router.post("/accept-order", ordersController.accept_order_post);
router.get("/order-status", ordersController.order_status_get);
router.post("/confirm-pickedup", ordersController.confirm_pickedup_post);
router.get("order", ordersController.order_get);
router.get("/orders", ordersController.orders_get);
router.post("/confirm-cooking", ordersController.confirm_cooking_post);
router.post(
  "/confirm-ready-to-pickup",
  ordersController.confirm_ready_to_pickup_post
);

module.exports = router;
