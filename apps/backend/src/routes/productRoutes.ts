import { Router } from "express";
import {
  createProduct,
  getProductsByTitle,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductByTitle,
} from "../controllers/productController";
import { upload } from "../repositories/cloudinaryRepository";

const productRouter = Router();

productRouter.post("/create", upload.array("images", 5), createProduct);
productRouter.get("/", getProducts);
productRouter.post("/by-title", getProductsByTitle);
productRouter.get("/:title", getProductByTitle);
productRouter.put("/:id", upload.array("images", 5), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
