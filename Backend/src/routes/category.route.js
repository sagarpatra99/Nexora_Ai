import { Router } from "express";
import {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
} from "../controllers/category.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

export const categoryRouter = Router();

// 👑 Admin only
categoryRouter.post(
  "/",
  identifyUser,
  authorizeRoles("admin"),
  createCategoryController
);

// 🌍 Public
categoryRouter.get("/", getCategoriesController);

// 👑 Admin only
categoryRouter.delete(
  "/:id",
  identifyUser,
  authorizeRoles("admin"),
  deleteCategoryController
);