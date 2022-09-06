# Autenticación con JWT

- Comenzamos creando nuestras rutas y controladores

```js
// models/server.js
 routes() {
    this.app.use(this.loginPath, routesAuth); // api/auth/login
    this.app.use(this.userPath, routesUser);
  }

// routes/auth.js
import { Router } from "express";
import { check } from "express-validator";
import { authPost } from "../controllers/auth.js";
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

export default router;

// controllers/auth.js
import { response, request } from "express";

export const authPost = (req, res = response) => {
  res.json({
    message: "auth :D",
  });
};


```

## Instalar jwt

```bash
npm i jsonwebtoken
```

- Antes de generar el jwt, vamos a hacer unas validaciones:

```js
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
```

- Apartamos el helper generateJWT, que se encargará de justamente de generar el token y devolverla.

```js
import jwt from "jsonwebtoken";

export const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.PUBLIC_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
```

- Respuesta:

```bash
{
    "user": {
        "_id": "6313caa7c466db91a286db63",
        "name": "test1",
        "email": "test1@gmail.com",
        "role": "SALE_ROLE",
        "google": false,
        "status": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzEzY2FhN2M0NjZkYjkxYTI4NmRiNjMiLCJpYXQiOjE2NjIyNzU4MjgsImV4cCI6MTY2MjI5MDIyOH0.GNH9dugk0-yg6wIdfXAi6E_eRMaO_3YyHL8A5Eer2SA"
}
```

# Proteger rutas mediante el uso del token

- Creamos un nuevo middleware que se va a ejecutar antes que los demás middlewares.

```js
// helpers/validate-jwt.js
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

// routes/user.js
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Is invalid the id").isMongoId(),
    check("id", "don't exist user with this id").custom((id) =>
      existUserById(id)
    ),
    validationField,
  ],
  userDelete
);
```

### Verificar el rol admin

```js
// middleware/isAdminRole.js

import { request, response } from "express";

export const isAdminRole = (req, res = response, next) => {
  const user = req.user;

  if (user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: "You are not allowed to stay here, you aren't admin role",
    });
  }

  next();
};
```

# Categorias y Productos
