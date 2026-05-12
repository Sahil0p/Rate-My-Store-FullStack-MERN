import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import env from "./config/env.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import ownerRoutes from "./routes/owner.routes.js";

import errorHandler from "./utils/errorHandler.js";

const app = express();

/* =========================
   FIX __dirname (ESM)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   CORE MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   STATIC FILES (IMAGES)
========================= */
/**
 * This makes uploaded images accessible at:
 * http://localhost:5000/uploads/filename.jpg
 */
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "../uploads"))
// );

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

/* =========================
   ERROR HANDLER
========================= */
app.use(errorHandler);

/* =========================
   SERVER
========================= */
app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`);
});
