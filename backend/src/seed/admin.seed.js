import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "System Administrator Account",
      email: "admin@ratemystore.com",
      password: hashedPassword,
      address: "System Generated",
      role: "ADMIN",
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();



// Email: admin@ratemystore.com
// Password: Admin@123
