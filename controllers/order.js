import { request, response } from "express";
import Order from "../models/order.js";

export const postOrderByUser = async (req = request, res = response) => {
  const { idProduct, idUser } = req.params;

  const order = await new Order({
    product: idProduct,
    user: idUser,
  }).populate("product", "user");

  console.log({ order });
  await order.save();

  res.json({
    message: "create order",
    order,
  });
};

export const getOrderByUser = async (req = request, res = response) => {
  const { idUser } = req.params;
  console.log({ idUser });

  const order = await Order.find({ user: idUser }).populate("product");

  res.status(200).json(order);
};
