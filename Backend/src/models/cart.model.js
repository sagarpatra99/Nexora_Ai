import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // 🔥 snapshot price (VERY IMPORTANT)
    price: {
      type: Number,
      required: true,
    },

    // optional (helps UI)
    title: String,
    image: String,
  },
  { _id: false }
);


const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// 🔥 Auto-calculate totals before saving
cartSchema.pre("save", function () {
  this.totalItems = this.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});


const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;