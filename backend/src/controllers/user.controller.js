import { submitRating } from "../services/rating.service.js";
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

export const listStoresUser = async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
};

export const myRating = async (req, res) => {
  const rating = await Rating.findOne({
    user: req.user._id,
    store: req.params.id,
  });
  res.json(rating);
};

export const rateStore = async (req, res) => {
  await submitRating(req.user._id, req.params.id, req.body.rating);
  res.json({ msg: "Rating saved" });
};
