import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // 🔒 don't return password in queries
    },

    role: {
      type: String,
      enum: ["admin", "user", "seller"],
      default: "user",
    },

    // avatar: {
    //   type: String, // URL (Cloudinary or similar)
    //   default: "",
    // },

    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },

    // purchaseHistory: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Order",
    //   },
    // ],

    // wishlist: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],

    // lastLogin: {
    //   type: Date,
    // },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);


// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// 🔑 Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// 🔄 Remove sensitive fields when sending response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


const userModel = mongoose.model("User", userSchema);

export default userModel;