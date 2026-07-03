import { Router } from "express";
import { addProductToBasket, createBasket, deleteBasket, getBasketByUserId, removeProductToBasket } from "../controllers/basketController";
const basketRouter = Router();

// Specific routes must be registered before the "/:id" param routes,
// otherwise "/add-product" and "/remove-product" get matched as an id.
basketRouter.post("/add-product", addProductToBasket)
basketRouter.delete("/remove-product", removeProductToBasket)
basketRouter.post("/:id", createBasket)
basketRouter.get("/:id", getBasketByUserId)
basketRouter.delete("/:id", deleteBasket)

export default basketRouter;
