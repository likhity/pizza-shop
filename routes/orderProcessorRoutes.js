import { Router } from "express";
import orderProcessorController from "../controllers/orderProcessorController.js";
import { requireOrderProcessorAuth } from "../middleware/authMiddleware.js";

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
 //need to make controller for individual acceptedOrders
router.get("/individual-accepted-order/:orderID", orderProcessorController.individual_accepted_order_get);
router.get("/individual-finished-order/:orderID", orderProcessorController.individual_finished_order_get);

/**
 * The following routes don't render pages. They are just
 * routes that the client uses to get current state
 * (like getting the order status) or change state (like
 * accepting an order or confirming an order has been picked up)
 */

//currently ommited "/accept-order/:orderID" into "/accept-order"
router.post("/accept-order", orderProcessorController.accept_order_post);
router.post("/confirm-pickedup", orderProcessorController.confirm_pickedup_post);
router.get("/order-status/:mongoOrderID", orderProcessorController.order_status_get);

export default router;
