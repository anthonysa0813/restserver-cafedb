import Product from "../models/products.js";

export const isValidIdByProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
};
