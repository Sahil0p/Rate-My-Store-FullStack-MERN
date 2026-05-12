

// import Store from "../models/Store.js";
// import Rating from "../models/Rating.js";

// export const ownerDashboard = async (req, res) => {
//   // ✅ Fetch ALL stores owned by this owner
//   const stores = await Store.find({ owner: req.user._id });

//   if (!stores.length) {
//     return res.json([]);
//   }

//   // ✅ For each store, fetch its ratings
//   const result = await Promise.all(
//     stores.map(async (store) => {
//       const ratings = await Rating.find({ store: store._id })
//         .populate("user", "name email")
//         .sort({ createdAt: -1 });

//       return {
//         store,
//         ratings,
//       };
//     })
//   );

//   res.json(result);
// };


import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

/* =========================
   HELPER
========================= */
const buildImageUrl = (req, imagePath) => {
  if (!imagePath) return "";
  return `${req.protocol}://${req.get("host")}${imagePath}`;
};

/* =========================
   OWNER DASHBOARD
========================= */
export const ownerDashboard = async (req, res) => {
  // Fetch ALL stores owned by this owner
  const stores = await Store.find({ owner: req.user._id }).lean();

  if (!stores.length) {
    return res.json([]);
  }

  // For each store, fetch ratings
  const result = await Promise.all(
    stores.map(async (store) => {
      const ratings = await Rating.find({ store: store._id })
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      return {
        store: {
          ...store,
          image: buildImageUrl(req, store.image),
        },
        ratings,
      };
    })
  );

  res.json(result);
};
