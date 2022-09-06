import { Router } from "express";
import { check } from "express-validator";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";
import { isValidId } from "../helpers/isValidId.js";
import { validateJWT } from "../helpers/validate-jwt.js";
import { validationField } from "../middlewares/validationField.js";

const router = Router();

// obtener todas las categorias
router.get("/", getCategories);

// obtener categoria por Id
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "the id is incorrect or not exist").isMongoId(),
    check("id", "EL id is incorrecto").custom((id) => isValidId(id)),
    validationField,
  ],
  getCategoryById
);

// crear una categoria con cualquier token válido
router.post(
  "/",
  [
    validateJWT,
    check("name", "the name is require!").not().isEmpty(),
    validationField,
  ],
  createCategory
);

// actualizar - cualquiera- con token válido
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "the id is invalid").isMongoId(),
    check("id", "the id don't exist").custom((id) => isValidId(id)),
    validationField,
  ],
  updateCategory
);

// eliminar categoria - Admin
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "the id is invalid").isMongoId(),
    check("id", "the id don't exist").custom((id) => isValidId(id)),
    validationField,
  ],
  deleteCategory
);

export default router;
