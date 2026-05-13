// import express from "express";
// import * as user from "../controllers/user.controller.js";
// import auth from "../middleware/auth.js";
// import validateRole from "../middleware/validateRole.js";

// const router = express.Router();
// router.use(auth, validateRole("USER"));

// router.get("/stores", user.listStoresUser);
// router.get("/rating/:id", user.myRating);
// router.post("/rating/:id", user.rateStore);
// router.get("/store/:id", user.getStoreById);

// export default router;

import express from "express";

import * as user from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";

import validateRole from "../middleware/validateRole.js";

const router = express.Router();

/* =========================
   USER AUTH GUARD
========================= */
router.use(
  auth,
  validateRole("USER")
);

/* =========================
   STORES
========================= */
router.get(
  "/stores",
  user.listStoresUser
);

/* =========================
   MY RATING
========================= */
router.get(
  "/rating/:id",
  user.myRating
);

/* =========================
   RATE STORE + REVIEW
========================= */
router.post(
  "/rating/:id",
  user.rateStore
);

/* =========================
   STORE DETAILS
========================= */
router.get(
  "/store/:id",
  user.getStoreById
);

/* =========================
   STORE REVIEWS
========================= */
router.get(
  "/store/:id/reviews",
  user.getStoreReviews
);

export default router;