import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
  role: {
    type: String,
    required: [true, "the role is required"],
  },
});

const model = mongoose.model("Role", RoleSchema);

export default model;
