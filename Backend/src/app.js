import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route.js";
import { productRouter } from './routes/product.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AI E-Commerce API" });
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

export default app;
