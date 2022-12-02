import { Router } from "express";
import chefController from "../controllers/chefController.js";
import { requireChefAuth } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * Auth middleware to check if user is authenticated
 * and that the user is a Chef
 */
router.use(requireChefAuth);

router.get("/order-list", chefController.order_list_get);
router.get("/order/:orderID", chefController.individual_order_get);

router.post("/confirm-ready-to-cook", chefController.confirm_ready_to_cook_post);
router.post("/confirm-cooking", chefController.confirm_cooking_post);
router.post("/confirm-ready-to-pickup", chefController.confirm_ready_to_pickup_post);
router.get("/order-status/:orderID", chefController.order_status_get);

export default router;
