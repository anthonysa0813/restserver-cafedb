import { response, request } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const userGet = async (req = request, res = response) => {
  const { offset, limit } = req.query;

  // path=http://localhost:5050/api/users?offset=10&limit=5
  const users = await User.find().limit(Number(limit)).skip(Number(offset));
  const total = await User.countDocuments();

  res.json({
    message: "Get user jiji",
    total,
    users,
  });
};

export const userPost = async (req = request, res) => {
  // const { name, email } = req.body;
  const { name, email, role, password, status } = req.body;
  const user = new User({ name, email, role, password, status });

  // hashear el password
  const salt = await bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

  // guardar en la DB
  await user.save();

  res.json({
    message: "Post user",
    user,
  });
};

export const registerUser = (req = request, res = response) => {
  const data = req.body;
};

export const userPatch = (req, res) => {
  res.json({
    message: "patch user",
  });
};

export const userPut = async (req = request, res) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;

  if (password) {
    const salt = await bcrypt.genSaltSync();
    resto.password = await bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);
  await user.save();

  res.json({
    message: "the user has been updated",
  });
};

export const userDelete = async (req = request, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user.status) {
    return res.status(401).json({
      message: "the status of the user is: false",
    });
  }

  await User.findByIdAndDelete(id);

  res.json({
    message: "Delete user",
  });
};
