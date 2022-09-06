import express from "express";
import cors from "cors";
import routesUser from "../routes/user.js";
import routesAuth from "../routes/auth.js";
import connectDB from "../databases/config.js";
import routesCategories from "../routes/category.js";
import routesProducts from "../routes/products.js";
import routesSearchTerm from "../routes/search.js";
import routesOrder from "../routes/order.js";

class Server {
  constructor() {
    this.app = express();
    this.userPath = "/api/users";
    this.loginPath = "/api/auth";
    this.paths = {
      user: "/api/users",
      login: "/api/auth",
      category: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      order: "/api/orders",
    };

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
    this.app.use(this.paths.login, routesAuth);
    this.app.use(this.paths.user, routesUser);
    this.app.use(this.paths.category, routesCategories);
    this.app.use(this.paths.products, routesProducts);
    this.app.use(this.paths.order, routesOrder);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`the application listen in the port ${process.env.PORT}`);
    });
  }
}

export default Server;
