import { request, response } from "express";
import Category from "../models/category.js";
import Product from "../models/products.js";

// obtener categorias - paginado - total -  populate
export const getCategories = async (req = request, res = response) => {
  const { limit = 10 } = req.query;
  console.log({ limit });

  const categories = await Category.find().limit(limit).populate("user");
  const total = await Category.countDocuments({ status: true });

  return res.status(201).json({
    categories,
    total,
  });
};

// obtener categoria by id - populate
export const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.status(201).json(category);
};

// obtener todos los productso por categoria
export const getProductsByCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const products = await Product.find({ category: id });

  console.log(products);
  res.json(products);
};

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  // si existe la category
  const category = await Category.findOne({ name });
  console.log(category);

  if (category) {
    return res.json({
      message: "the category has been created",
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const newCategory = await new Category(data);

  newCategory.save();

  return res.status(201).json(newCategory);
};

// actualizar categoria
export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const data = req.body;

  await Category.findByIdAndUpdate(id, data);
  res.status(201).json({
    message: "category has been updated",
  });
};

// borrar categoria
export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);
  res.json({ message: "delete category" });
};
