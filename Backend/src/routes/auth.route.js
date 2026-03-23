import { Router } from "express";
import {
  getMeController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginDto, registerDto } from "../validations/auth.validator.js";
import { identifyUser } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerDto), registerController);
authRouter.post("/login", validate(loginDto), loginController);
authRouter.get("/get-me", identifyUser, getMeController);
