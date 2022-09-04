import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  email: {
    type: String,
    required: [true, "the email is required"],
  },
  password: {
    type: String,
    required: [true, "the password is required"],
  },
  role: {
    type: String,
    required: [true, "the role is required"],
  },
  img: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
  google: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  return {
    uid: _id,
    ...usuario,
  };
};

const modelo = mongoose.model("User", UserSchema);

export default modelo;
