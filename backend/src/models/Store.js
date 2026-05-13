// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     address: {
//       type: String,
//       required: true,
//       maxlength: 400,
//       trim: true,
//     },

//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     avgRating: {
//       type: Number,
//       default: 0,
//     },

//     /**
//      * Stores uploaded image path
//      * Example: /uploads/stores/abc123.jpg
//      */
//     image: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// /**
//  * 🔹 Indexing for faster queries
//  */
// storeSchema.index({ owner: 1 });
// storeSchema.index({ name: 1 });

// export default mongoose.model("Store", storeSchema);


import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
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

    description: {
      type: String,
      default: "",
      maxlength: 1000,
      trim: true,
    },

    // ================= STORE DETAILS =================
    category: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // ================= OWNER =================
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= RATINGS =================
    avgRating: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },

    // ================= IMAGE =================
    /**
     * Uploaded image path
     * Example:
     * /uploads/stores/abc123.jpg
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

// ================= INDEXING =================
storeSchema.index({ owner: 1 });

storeSchema.index({ name: 1 });

storeSchema.index({ category: 1 });

storeSchema.index({ city: 1 });

storeSchema.index({ featured: 1 });

export default mongoose.model("Store", storeSchema);