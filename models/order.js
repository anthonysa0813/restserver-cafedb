import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    red: "User",
  },
});

export default mongoose.model("Order", OrderSchema);
