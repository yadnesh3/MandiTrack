const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"],
    },

    password: {
      type: String,
      required: true,
      // Never ship the hash to the client. Login has to ask for it
      // explicitly with .select("+password").
      select: false,
    },

    role: {
      type: String,
      enum: ["farmer", "officer", "admin"],
      default: "farmer",
    },

    mandi: {
      type: String,
      trim: true,
      default: "",
    },

    officerId: {
      type: String,
      trim: true,
      sparse: true,
      unique: true,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
