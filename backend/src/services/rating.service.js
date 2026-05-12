// import Rating from "../models/Rating.js";
// import Store from "../models/Store.js";

// export const submitRating = async (userId, storeId, rating) => {
//   const existing = await Rating.findOne({ user: userId, store: storeId });
//   if (existing) {
//     existing.rating = rating;
//     await existing.save();
//   } else {
//     await Rating.create({ user: userId, store: storeId, rating });
//   }

//   const agg = await Rating.aggregate([
//     { $match: { store: storeId } },
//     { $group: { _id: null, avg: { $avg: "$rating" } } },
//   ]);

//   await Store.findByIdAndUpdate(storeId, { avgRating: agg[0].avg });
// };

import mongoose from "mongoose";
import Rating from "../models/Rating.js";
import Store from "../models/Store.js";

export const submitRating = async (userId, storeId, rating) => {
  // ✅ Validate rating
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // ✅ Ensure store exists
  const store = await Store.findById(storeId);
  if (!store) {
    throw new Error("Store not found");
  }

  // ✅ Upsert rating
  const existing = await Rating.findOne({
    user: userId,
    store: storeId,
  });

  if (existing) {
    existing.rating = rating;
    await existing.save();
  } else {
    await Rating.create({
      user: userId,
      store: storeId,
      rating,
    });
  }

  // ✅ FIX: Cast storeId to ObjectId
  const storeObjectId = new mongoose.Types.ObjectId(storeId);

  // ✅ Recalculate avg rating safely
  const agg = await Rating.aggregate([
    { $match: { store: storeObjectId } },
    { $group: { _id: null, avg: { $avg: "$rating" } } },
  ]);

  const avgRating = agg.length ? Number(agg[0].avg.toFixed(1)) : 0;

  await Store.findByIdAndUpdate(storeId, {
    avgRating,
  });
};
