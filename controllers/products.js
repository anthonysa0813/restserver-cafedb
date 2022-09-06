import { request, response } from "express";
import Product from "../models/products.js";

export const getProducts = async (req = request, res = response) => {
  const products = await Product.find();

  res.status(200).json(products);
};

export const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);

  res.status(200).json(product);
};

export const postProduct = async (req = request, res = response) => {
  const { name, price, category, image } = req.body;
  const { _id } = req.user;

  const data = {
    id: _id,
    name,
    price,
    category,
    image,
  };
  const product = await Product(data);

  product.save();

  res.status(201).json(product);
};

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const data = req.body;

  await Product.findByIdAndUpdate(id, data);

  res.status(200).json({
    message: "Product was successfully updated",
  });
};

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product was successfully deleted",
  });
};
