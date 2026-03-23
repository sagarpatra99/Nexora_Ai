import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { postProductController } from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postProductDto } from "../validations/product.validator.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

export const productRouter = Router();

productRouter.post(
  "/create",
  identifyUser,
  authorizeRoles("seller"),
  validate(postProductDto),
  postProductController,
);
