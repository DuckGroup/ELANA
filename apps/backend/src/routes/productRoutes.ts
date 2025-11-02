import { Router } from "express";
import {
  createProduct,
  getProductsByTitle,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
// add requireAuth later
const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/", getProducts);
productRouter.post("/by-title", getProductsByTitle);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
