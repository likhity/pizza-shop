const { Router } = require("express");
const chefController = require("../controllers/chefController");
const { requireChefAuth } = require("../middleware/authMiddleware");

const router = Router();

/**
 * Auth middleware to check if user is authenticated
 * and that the user is a Chef
 */
router.use(requireChefAuth);

router.get("/order-list", chefController.order_list_get);
router.get("/order/:orderID", chefController.order_get);

// router.post("/confirm-cooking/:orderID", chefController.confirm_cooking_post);
router.post("/confirm-ready-to-pickup/:orderID", chefController.confirm_ready_to_pickup_post);
 router.get("/order-status/:orderID", chefController.order_status_get);

module.exports = router;
