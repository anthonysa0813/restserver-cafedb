import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, "the status is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    default: 0,
    required: [true, "the price is required"],
  },
  description: {
    type: String,
  },
});

const model = mongoose.model("Product", ProductSchema);

export default model;
