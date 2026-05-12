import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", ratingSchema);
