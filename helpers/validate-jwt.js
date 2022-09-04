import { response, request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");

  // verificación si están mandando el token
  if (!token) {
    return res.status(401).json({
      message: "not exist token",
    });
  }

  // validación del token
  try {
    const { uid } = jwt.verify(token, process.env.PUBLIC_KEY);

    // usuari autenticado
    const user = await User.findById(uid);

    // en este paso estamos agregando al request unos camps extras para lo que demas middlewares puedan leerlos.
    req.user = user;
    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      message: "token NOT valid",
    });
  }
};
