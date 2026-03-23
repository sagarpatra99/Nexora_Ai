import { success } from "zod";
import productModel from "../models/product.model.js";

export const postProductController = async (req, res) => {
  try {
    // if (!req.user?.id) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized",
    //   });
    // }

    // if (req.user?.role === "user") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "User is not allowed to post a product!",
    //   });
    // }

    const createdBy = req.user.id;

    const {
      title,
      description,
      price,
      category,
      brand,
      stock,
      images,
      tags,
      isFeatured,
      isActive,
    } = req.validatedData;

    const product = await productModel.create({
      title,
      description,
      price,
      category,
      brand,
      stock,
      images,
      tags,
      createdBy, // ✅ important
      isFeatured: req.validatedData.isFeatured ?? false,
      isActive: req.validatedData.isActive ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Post Product error:", error);

    res.status(500).json({
      success: false,
      message: "Post Product failed",
      error: error.message,
    });
  }
};
