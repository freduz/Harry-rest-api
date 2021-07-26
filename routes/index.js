import express from "express";
import { APP_PORT } from "./../config/index";
import {
  registerController,
  loginController,
  userController,
  workController,
} from "./../controllers";

import auth from "./../middlewares/auth";

const route = express.Router();

// @route handler functions

route.post("/register", registerController.register);
route.post("/login", loginController.login);
route.get("/me", auth, userController.me);
route
  .route("/worktime")
  .post(workController.addWorkTime)
  .get(workController.getAllWorkTime);
route.patch("/blockapp/:id", workController.blockApp);

export default route;
