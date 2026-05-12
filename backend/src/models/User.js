import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, maxlength: 400 },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "OWNER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
