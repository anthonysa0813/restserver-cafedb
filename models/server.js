import express from "express";
import cors from "cors";
import routesUser from "../routes/user.js";
import routesAuth from "../routes/auth.js";
import connectDB from "../databases/config.js";

class Server {
  constructor() {
    this.app = express();
    this.userPath = "/api/users";
    this.loginPath = "/api/auth";

    // conectar db
    this.connectDatabase();
    // middleware
    this.middleware();

    // rutas
    this.routes();
  }

  async connectDatabase() {
    await connectDB();
  }

  middleware() {
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.loginPath, routesAuth);
    this.app.use(this.userPath, routesUser);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`the application listen in the port ${process.env.PORT}`);
    });
  }
}

export default Server;
