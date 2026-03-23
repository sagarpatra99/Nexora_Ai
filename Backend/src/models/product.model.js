import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: 150,
      index: true, // 🔥 for search optimization
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: 2000,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      trim: true,
      index: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    images: [
      {
        url: String,
        altText: String,
      },
    ],

    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],

    // 🔥 AI: price history for prediction
    priceHistory: [
      {
        price: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // 🔥 AI: track user interaction relevance
    viewCount: {
      type: Number,
      default: 0,
    },

    purchaseCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// 🔍 Text index for search (IMPORTANT)
productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
});

// 📉 Track price changes automatically
productSchema.pre("save", function () {
  if (this.isModified("price")) {
    this.priceHistory.push({
      price: this.price,
    });
  }
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
