// import { submitRating } from "../services/rating.service.js";
// import Store from "../models/Store.js";
// import Rating from "../models/Rating.js";

// export const listStoresUser = async (req, res) => {
//   const stores = await Store.find();
//   res.json(stores);
// };

// export const myRating = async (req, res) => {
//   const rating = await Rating.findOne({
//     user: req.user._id,
//     store: req.params.id,
//   });
//   res.json(rating);
// };

// export const rateStore = async (req, res) => {
//   await submitRating(req.user._id, req.params.id, req.body.rating);
//   res.json({ msg: "Rating saved" });
// };

// export const getStoreById = async (req, res) => {
//   try {
//     const store = await Store.findById(req.params.id);

//     res.json(store);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch store",
//     });
//   }
// };

import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

/* =========================
   LIST ALL STORES
========================= */
export const listStoresUser = async (
  req,
  res
) => {
  try {
    const stores = await Store.find();

    res.json(stores);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "Failed to fetch stores",
    });
  }
};

/* =========================
   MY RATING
========================= */
export const myRating = async (
  req,
  res
) => {
  try {
    const rating =
      await Rating.findOne({
        user: req.user._id,
        store: req.params.id,
      });

    res.json(rating);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "Failed to fetch rating",
    });
  }
};

/* =========================
   RATE STORE + REVIEW
========================= */
export const rateStore = async (
  req,
  res
) => {
  try {
    const { rating, review } =
      req.body;

    let existing =
      await Rating.findOne({
        user: req.user._id,
        store: req.params.id,
      });

    // ================= UPDATE =================
    if (existing) {
      existing.rating = rating;

      existing.review =
        review || "";

      await existing.save();
    }

    // ================= CREATE =================
    else {
      await Rating.create({
        user: req.user._id,

        store: req.params.id,

        rating,

        review: review || "",
      });
    }

    // ================= RECALCULATE STORE =================
    const ratings =
      await Rating.find({
        store: req.params.id,
      });

    const avg =
      ratings.reduce(
        (sum, r) =>
          sum + r.rating,
        0
      ) / ratings.length;

    await Store.findByIdAndUpdate(
      req.params.id,
      {
        avgRating: avg || 0,

        totalRatings:
          ratings.length,
      }
    );

    res.json({
      msg: "Rating & review saved",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "Failed to save review",
    });
  }
};

/* =========================
   STORE DETAILS
========================= */
export const getStoreById =
  async (req, res) => {
    try {
      const store =
        await Store.findById(
          req.params.id
        ).populate(
          "owner",
          "name email"
        );

      if (!store) {
        return res.status(404).json({
          msg: "Store not found",
        });
      }

      res.json(store);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        msg: "Failed to fetch store",
      });
    }
  };

/* =========================
   STORE REVIEWS
========================= */
export const getStoreReviews =
  async (req, res) => {
    try {
      const reviews =
        await Rating.find({
          store: req.params.id,
        })
          .populate(
            "user",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      res.json(reviews);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        msg: "Failed to fetch reviews",
      });
    }
  };