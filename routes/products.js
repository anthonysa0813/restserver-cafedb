import { Router } from "express";
import { check } from "express-validator";
import { validationField } from "../middlewares/validationField.js";
import { validateJWT } from "../helpers/validate-jwt.js";
import { isAdminRole } from "../middlewares/isAdminRole.js";
import {
  deleteProduct,
  getProductById,
  getProducts,
  postProduct,
  updateProduct,
} from "../controllers/products.js";
import { isValidIdByProduct } from "../helpers/isValidIdByProduct.js";

const router = Router();

// get all products
router.get("/", getProducts);
// get productById
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "id invalid").isMongoId(),
    check("id", "the id dont exist").custom((id) => isValidIdByProduct(id)),
    validationField,
  ],
  getProductById
);

// post product
router.post(
  "/",
  [
    validateJWT,
    check("name", "the name of the product is required").not().isEmpty(),
    check("price", "the price of the product is required").isNumeric(),
    check("image", "the image of the product is required").isString(),
    validationField,
  ],
  postProduct
);

// update product
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "id invalid").isMongoId(),
    check("id", "the id dont exist").custom((id) => isValidIdByProduct(id)),
    validationField,
  ],
  updateProduct
);

// delete product
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "id invalid").isMongoId(),
    check("id", "the id dont exist").custom((id) => isValidIdByProduct(id)),
    validationField,
  ],
  deleteProduct
);

export default router;
