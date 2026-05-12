import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      maxlength: 400,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    avgRating: {
      type: Number,
      default: 0,
    },

    /**
     * Stores uploaded image path
     * Example: /uploads/stores/abc123.jpg
     */
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 🔹 Indexing for faster queries
 */
storeSchema.index({ owner: 1 });
storeSchema.index({ name: 1 });

export default mongoose.model("Store", storeSchema);
