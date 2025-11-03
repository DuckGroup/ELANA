import express from "express";
import { getOrderStats } from "../controllers/orderController";
// add requireAuth later
const router = express.Router();

router.get("/stats", getOrderStats);

export default router;