import { Router } from "express";
import { check } from "express-validator";
import { getOrderByUser, postOrderByUser } from "../controllers/order.js";
import { validationField } from "../middlewares/validationField.js";

const router = Router();

// crear una order
router.post(
  "/:idProduct/:idUser",
  [
    check("idProduct", "the idPrduct es required").isMongoId(),
    check("idUser", "the idPrduct es required").isMongoId(),
    validationField,
  ],
  postOrderByUser
);

router.get(
  "/:idUser",
  [check("idUser", "the idPrduct es required").isMongoId(), validationField],
  getOrderByUser
);

export default router;
