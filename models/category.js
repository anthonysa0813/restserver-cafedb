import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
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
});

export default mongoose.model("Category", CategorySchema);
