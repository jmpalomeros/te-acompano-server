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
        required: true,
        trim: true,
        lowercase: true
      },
      lastName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
      } ,
      email: {
        type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
      },
      password:{
        type: String,
        required: true
      },
      avatar: {
        type: String,
      },
      age: Number,
      city: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
