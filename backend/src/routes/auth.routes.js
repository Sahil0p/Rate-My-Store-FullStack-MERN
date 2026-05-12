import express from "express";
import { signup, login, changePassword } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/password", auth, changePassword);

export default router;
