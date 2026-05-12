import User from "../models/User.js";

export const listStoresForUser = async () => {
  return User.aggregate([
    { $match: { role: "OWNER" } },
    { $project: { name: 1, email: 1, address: 1 } },
  ]);
};

export const getUserById = async (id) => {
  return User.findById(id).select("-password");
};
