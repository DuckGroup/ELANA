import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { connectBasketController } from "../controllers/basketController";
const basketRouter = Router();

basketRouter.post("/", (req, res) => connectBasketController(req, res))

export default basketRouter;
 