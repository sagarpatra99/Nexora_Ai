import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import {
  addToCartController,
  getCartController,
} from "../controllers/cart.controller.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

export const cartRouter = Router();

// 🛒 Add to cart
cartRouter.post("/", identifyUser, authorizeRoles("user"), addToCartController);
cartRouter.get("/", identifyUser, authorizeRoles("user"), getCartController);
