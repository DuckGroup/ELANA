import { Router } from "express";
import { createBasket } from "../controllers/basketController"
import { requiresAuth } from "express-openid-connect";
const basketRouter = Router();

basketRouter.post("/", requiresAuth(), createBasket)

export default basketRouter;
 