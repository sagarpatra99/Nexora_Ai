import mongoose from "mongoose";
import productModel from "../models/product.model.js";

export const getRecommendedProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    // ❌ Validate ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // 🔍 Get current product
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🧠 Recommendation logic
    const recommendedProducts = await productModel.find({
      _id: { $ne: productId }, // exclude current product
      isActive: true,

      $or: [
        { category: product.category },
        { tags: { $in: product.tags } },
        {
          price: {
            $gte: product.price * 0.7,
            $lte: product.price * 1.3,
          },
        },
      ],
    })
    .sort({ purchaseCount: -1, viewCount: -1 }) // 🔥 popular first
    .limit(10);

    res.status(200).json({
      success: true,
      recommendedProducts,
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
      error: error.message,
    });
  }
};