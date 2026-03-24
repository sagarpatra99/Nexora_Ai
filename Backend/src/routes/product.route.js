import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { getProductsController, getSingleProductController, postProductController } from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postProductDto } from "../validations/product.validator.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { getRecommendedProducts } from "../controllers/ai.controller.js";

export const productRouter = Router();

productRouter.post(
  "/",
  identifyUser,
  authorizeRoles("seller"),
  validate(postProductDto),
  postProductController,
);

productRouter.get("/", getProductsController)
productRouter.get("/:id", getSingleProductController)

//? AI recommendation routes
productRouter.get("/recommend/:productId", getRecommendedProducts)
