import Category from "../models/category.js";

export const isValidId = async (id) => {
  const cate = await Category.findById(id);

  if (!cate) {
    throw new Error("the id don't exist");
  }
};
