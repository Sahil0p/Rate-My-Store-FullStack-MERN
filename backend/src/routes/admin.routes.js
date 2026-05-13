// import express from "express";
// import * as admin from "../controllers/admin.controller.js";
// import auth from "../middleware/auth.js";
// import validateRole from "../middleware/validateRole.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// /* =========================
//    ADMIN AUTH GUARD
// ========================= */
// router.use(auth, validateRole("ADMIN"));

// /* =========================
//    DASHBOARD
// ========================= */
// router.get("/dashboard", admin.dashboardStats);

// /* =========================
//    USERS
// ========================= */
// router.get("/users", admin.listUsers);

// /* =========================
//    STORES (CRUD + IMAGE)
// ========================= */
// router.get("/stores", admin.listStoresAdmin);

// /**
//  * IMPORTANT:
//  * multer MUST be applied ONLY on routes that accept files
//  * and ONLY ONCE per route
//  */
// router.post(
//   "/stores",
//   upload.single("image"),
//   admin.createStore
// );

// router.put(
//   "/stores/:id",
//   upload.single("image"),
//   admin.updateStore
// );

// router.get("/ratings", admin.ratingsAnalytics);


// router.delete("/stores/:id", admin.deleteStore);



// export default router;

// backend/routes/adminRoutes.js

import express from "express";
import * as admin from "../controllers/admin.controller.js";
import auth from "../middleware/auth.js";
import validateRole from "../middleware/validateRole.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* =========================
   ADMIN AUTH GUARD
========================= */
router.use(auth, validateRole("ADMIN"));

/* =========================
   DASHBOARD
========================= */
router.get("/dashboard", admin.dashboardStats);

/* =========================
   USERS
========================= */
router.get("/users", admin.listUsers);

/* ✅ ADD THIS */
router.put(
  "/users/:id",
  admin.updateUser
);

/* =========================
   STORES (CRUD + IMAGE)
========================= */
router.get(
  "/stores",
  admin.listStoresAdmin
);

router.post(
  "/stores",
  upload.single("image"),
  admin.createStore
);

router.put(
  "/stores/:id",
  upload.single("image"),
  admin.updateStore
);

router.get(
  "/ratings",
  admin.ratingsAnalytics
);

router.delete(
  "/stores/:id",
  admin.deleteStore
);

export default router;