import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route.js";
import { productRouter } from "./routes/product.route.js";
import { cartRouter } from "./routes/cart.route.js";
import { categoryRouter } from "./routes/category.route.js";

const app = express();

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to AI E-Commerce API" });
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/categories", categoryRouter);

export default app;
