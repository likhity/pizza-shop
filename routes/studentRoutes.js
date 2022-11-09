const { Router } = require("express");
const studentController = require("../controllers/studentController");
const { requireStudentAuth } = require("../middleware/authMiddleware");

const router = Router();

/**
 * Auth middleware to check if user is authenticated
 * and that the user is a Student
 */
router.use(requireStudentAuth);

// These routes render pages
router.get("/customize-pizza", studentController.customize_pizza_get);
router.get("/pickup-time", studentController.pickup_time_get);
router.get("/special-instructions", studentController.special_instructions_get);
router.get("/order-summary", studentController.order_summary_get);
router.get("/view-order-status", studentController.view_order_status_get);

/**
 * The following routes don't render pages. They are just
 * routes that the client uses to get current state
 * (like getting the order status) or change state (like
 * creating/canceling an order)
 */
router.post("/create-order", studentController.create_order_post);
router.delete("/cancel-order", studentController.cancel_order_delete);
router.get("order-status", studentController.order_status_get);

module.exports = router;