import express from "express";
import * as user from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import validateRole from "../middleware/validateRole.js";

const router = express.Router();
router.use(auth, validateRole("USER"));

router.get("/stores", user.listStoresUser);
router.get("/rating/:id", user.myRating);
router.post("/rating/:id", user.rateStore);

export default router;
