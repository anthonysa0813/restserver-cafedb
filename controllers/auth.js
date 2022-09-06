import { response, request } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt.js";

export const authPost = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    //Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "the user with that email don't exist",
      });
    }
    // Si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        message: "the user is inactive",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "the password is incorrect",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "talk about with the admin",
    });
  }
};

export const signupUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  const data = {
    name: "No name",
    email,
    password,
    role: "ADMIN_ROLE",
    status: true,
  };
  const user = await new User(data);

  // hashear el password
  const salt = await bcryptjs.genSaltSync();
  user.password = await bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    message: "signup",
    user,
  });
};
