import express from "express";
import {
  createOrder,
  getOrders,
  getOrderStats,
} from "../controllers/orderController";
// add requireAuth later
const router = express.Router();

router.get("/stats", getOrderStats);
router.get("/", getOrders);
router.post("/", createOrder);

export default router;
