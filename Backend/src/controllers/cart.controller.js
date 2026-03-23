import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  try {
    // 🔐 1. Auth check
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    // ❌ Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // 🔍 2. Check product exists
    const product = await productModel.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ❌ Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    // 🔍 3. Find user's cart
    let cart = await cartModel.findOne({ userId });

    // 🆕 4. If cart doesn't exist → create
    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [
          {
            productId,
            quantity,
            price: product.price,
            title: product.title,
            image: product.images?.[0]?.url,
          },
        ],
      });
    } else {
      // 🔄 5. Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // ➕ Increase quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // ➕ Add new item
        cart.items.push({
          productId,
          quantity,
          price: product.price,
          title: product.title,
          image: product.images?.[0]?.url,
        });
      }

      // 💾 Save updated cart
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    // 🔐 1. Auth check
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    // 🔍 2. Find user's cart
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "title price images");

    // 🆕 3. If cart doesn't exist
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        },
      });
    }

    // ✅ 4. Return cart
    res.status(200).json({
      success: true,
      message: "Cart Products fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Get Cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

export const removeFromCartController = async (req, res) => {
  try {
    // 🔐 1. Auth check
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;
    const { productId } = req.params;

    // ❌ 2. Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // 🔍 3. Find cart
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // 🔄 4. Filter out the product
    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // ❌ 5. Check if item existed
    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // 💾 6. Save updated cart
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove item",
      error: error.message,
    });
  }
};