import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
        url: {
          type: String,
          required: true,
        },
        altText: String,
      },
    ],

    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },

    tags: [{ type: String, lowercase: true }],

    priceHistory: [
      {
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],

    viewCount: { type: Number, default: 0 },
    purchaseCount: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
});

productSchema.index({ category: 1, price: 1 });

productSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }

  if (this.isModified("price")) {
    this.priceHistory.push({
      price: this.price,
    });
  }
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
