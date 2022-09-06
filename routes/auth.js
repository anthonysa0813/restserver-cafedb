import { Router } from "express";
import { check } from "express-validator";
import { authPost, signupUser } from "../controllers/auth.js";
import { validationField } from "../middlewares/validationField.js";

const router = Router();

router.post(
  "/login",
  [
    check("email", "invalid email").isEmail(),
    check("password", "is necessary the password").not().isEmpty(),
    validationField,
  ],
  authPost
);

router.post(
  "/signup",
  [
    check("email", "invalid email").isEmail(),
    check("password", "is necessary the password").not().isEmpty(),
    validationField,
  ],
  signupUser
);

export default router;
