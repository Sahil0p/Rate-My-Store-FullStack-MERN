import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

export const createStore = async (data) => {
  return Store.create(data);
};

export const listStores = async (filter = {}) => {
  return Store.find(filter).populate("owner", "name email");
};

export const getStoreRatings = async (storeId) => {
  return Rating.find({ store: storeId }).populate("user", "name email");
};
