// import User from "../models/User.js";
// import Store from "../models/Store.js";
// import Rating from "../models/Rating.js";

// /* =========================
//    DASHBOARD
// ========================= */
// export const dashboardStats = async (req, res) => {
//   const totalUsers = await User.countDocuments();
//   const totalStores = await Store.countDocuments();
//   const totalRatings = await Rating.countDocuments();

//   res.json({ totalUsers, totalStores, totalRatings });
// };

// /* =========================
//    USERS
// ========================= */
// export const listUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// };

// /* =========================
//    STORES
// ========================= */
// export const listStoresAdmin = async (req, res) => {
//   const stores = await Store.find().populate("owner", "name email");
//   res.json(stores);
// };

// /**
//  * CREATE STORE
//  * - Admin can pass ownerId OR ownerEmail
//  * - Image is optional (file upload)
//  */
// export const createStore = async (req, res) => {
//   try {
//     const { name, address, owner, ownerEmail } = req.body;

//     if (!name || !address) {
//       return res.status(400).json({ msg: "Name and address required" });
//     }

//     let ownerUser = null;
//     if (owner) ownerUser = await User.findById(owner);
//     if (!ownerUser && ownerEmail) {
//       ownerUser = await User.findOne({
//         email: ownerEmail,
//         role: "OWNER",
//       });
//     }

//     if (!ownerUser) {
//       return res.status(400).json({ msg: "Valid owner required" });
//     }

//     const imagePath = req.file
//       ? `/uploads/stores/${req.file.filename}`
//       : "";

//     const store = await Store.create({
//       name,
//       address,
//       owner: ownerUser._id,
//       image: imagePath,
//     });

//     res.status(201).json(store);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };

// /**
//  * UPDATE STORE
//  */
// export const updateStore = async (req, res) => {
//   try {
//     const store = await Store.findById(req.params.id);
//     if (!store) {
//       return res.status(404).json({ msg: "Store not found" });
//     }

//     const name = req.body?.name;
//     const address = req.body?.address;
//     const owner = req.body?.owner;

//     if (name) store.name = name;
//     if (address) store.address = address;

//     if (owner) {
//       const ownerUser = await User.findById(owner);
//       if (!ownerUser || ownerUser.role !== "OWNER") {
//         return res.status(400).json({ msg: "Invalid owner" });
//       }
//       store.owner = owner;
//     }

//     // ✅ FIXED IMAGE PATH (IMPORTANT)
//     if (req.file) {
//       store.image = `/uploads/stores/${req.file.filename}`;
//     }

//     await store.save();
//     res.json(store);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };

// /**
//  * DELETE STORE
//  */
// export const deleteStore = async (req, res) => {
//   await Store.findByIdAndDelete(req.params.id);
//   res.json({ msg: "Store deleted" });
// };

import User from "../models/User.js";
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

/* =========================
   HELPERS
========================= */
const buildImageUrl = (req, imagePath) => {
  if (!imagePath) return "";
  return `${req.protocol}://${req.get("host")}${imagePath}`;
};

/* =========================
   DASHBOARD
========================= */
export const dashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStores = await Store.countDocuments();
  const totalRatings = await Rating.countDocuments();

  res.json({ totalUsers, totalStores, totalRatings });
};

/* =========================
   USERS
========================= */
export const listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* =========================
   STORES (ADMIN)
========================= */
export const listStoresAdmin = async (req, res) => {
  const stores = await Store.find()
    .populate("owner", "name email")
    .lean();

  const formatted = stores.map((s) => ({
    ...s,
    image: buildImageUrl(req, s.image),
  }));

  res.json(formatted);
};

/* =========================
   CREATE STORE
========================= */
export const createStore = async (req, res) => {
  try {
    const { name, address, owner, ownerEmail } = req.body;

    if (!name || !address) {
      return res.status(400).json({ msg: "Name and address required" });
    }

    let ownerUser = null;

    if (owner) ownerUser = await User.findById(owner);
    if (!ownerUser && ownerEmail) {
      ownerUser = await User.findOne({
        email: ownerEmail,
        role: "OWNER",
      });
    }

    if (!ownerUser) {
      return res.status(400).json({ msg: "Valid owner required" });
    }

    const imagePath = req.file
      ? `/uploads/stores/${req.file.filename}`
      : "";

    const store = await Store.create({
      name,
      address,
      owner: ownerUser._id,
      image: imagePath,
    });

    res.status(201).json({
      ...store.toObject(),
      image: buildImageUrl(req, store.image),
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* =========================
   UPDATE STORE
========================= */
export const updateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ msg: "Store not found" });
    }

    const { name, address, owner } = req.body;

    if (name) store.name = name;
    if (address) store.address = address;

    if (owner) {
      const ownerUser = await User.findById(owner);
      if (!ownerUser || ownerUser.role !== "OWNER") {
        return res.status(400).json({ msg: "Invalid owner" });
      }
      store.owner = owner;
    }

    if (req.file) {
      store.image = `/uploads/stores/${req.file.filename}`;
    }

    await store.save();

    res.json({
      ...store.toObject(),
      image: buildImageUrl(req, store.image),
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/* =========================
   DELETE STORE
========================= */
export const deleteStore = async (req, res) => {
  await Store.findByIdAndDelete(req.params.id);
  res.json({ msg: "Store deleted" });
};



export const ratingsAnalytics = async (req, res) => {
  const stores = await Store.find();

  const result = await Promise.all(
    stores.map(async (store) => {
      const ratings = await Rating.find({ store: store._id });

      const breakdown = {};
      ratings.forEach((r) => {
        breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
      });

      return {
        _id: store._id,
        name: store.name,
        address: store.address,
        avgRating: store.avgRating || 0,
        totalRatings: ratings.length,
        breakdown,
      };
    })
  );

  res.json(result);
};
