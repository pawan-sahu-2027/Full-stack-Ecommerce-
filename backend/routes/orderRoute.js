import express from "express";
import {
  createOrder,
  getMyOrder,
  getUserOrders,
  getAllOrdersAdmin,
  getSalesData,
} from "../controllers/orderController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Standard route
router.post("/create-order", isAuthenticated, createOrder);

// Webhook route - defined BEFORE express.json() in your server.js
// OR use this helper if defined here:
// router.post("/webhook", express.raw({ type: 'application/json' }), stripeWebhookController);
router.get("/myorder", isAuthenticated, getMyOrder);
router.get("/all", isAuthenticated, isAdmin, getAllOrdersAdmin);
router.get("/user-order/:userId", isAuthenticated, isAdmin, getUserOrders);
router.get("/sales", isAuthenticated, getSalesData);
export default router;
 