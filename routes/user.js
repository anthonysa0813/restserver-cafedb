import { Router } from "express";
import {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} from "../controllers/users.js";
import { check } from "express-validator";
import { validationField } from "../middlewares/validationField.js";
import {
  existUserById,
  isExistEmail,
  isValidRole,
} from "../helpers/isValidRole.js";
import { validateJWT } from "../helpers/validate-jwt.js";
import { isAdminRole } from "../middlewares/isAdminRole.js";

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("name", "the name is required").not().isEmpty(),
    check("email", "the email is invalid").custom((email) =>
      isExistEmail(email)
    ),
    check("role", "the role isn't valid").custom((role) => isValidRole(role)),
    validationField,
  ],
  userPost
);
router.put(
  "/:id",
  [
    check("id", "Is invalid the id").isMongoId(),
    check("id", "don't exist user with this id").custom((id) =>
      existUserById(id)
    ),
    validationField,
  ],
  userPut
);
router.patch("/", userPatch);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Is invalid the id").isMongoId(),
    check("id", "don't exist user with this id").custom((id) =>
      existUserById(id)
    ),
    validationField,
  ],
  userDelete
);

export default router;
