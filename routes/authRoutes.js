import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.get("/student/login", authController.student_login_get);
router.post("/student/login", authController.student_login_post);
router.get("/orderprocessor/login", authController.orderprocessor_login_get);
router.post("/orderprocessor/login", authController.orderprocessor_login_post);
router.get("/chef/login", authController.chef_login_get);
router.post("/chef/login", authController.chef_login_post);
router.get("/logout", authController.logout);

export default router;
