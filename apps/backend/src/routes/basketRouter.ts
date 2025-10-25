import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { createBasket, getBasketByUserId } from "../controllers/basketController";
const basketRouter = Router();

basketRouter.post("/", createBasket)
basketRouter.get("/:id", getBasketByUserId)

export default basketRouter;
 