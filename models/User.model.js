const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user", "volunteer"],
      default: "user",
    },
    firstName: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    age: Number,
    city: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
