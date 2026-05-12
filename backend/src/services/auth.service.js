import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js";

export const signupUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashed });
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return { token, user };
};

export const updatePassword = async (id, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(id, { password: hashed });
  return true;
};
