import Role from "../models/role.js";
import User from "../models/user.js";

export const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error("The role isn't available");
  }
};

export const isExistEmail = async (email) => {
  const isValidEmail = await User.findOne({ email });
  if (isValidEmail) {
    throw new Error("The email is already in use");
  }
};

export const existUserById = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error("the user does not exist");
  }
};
