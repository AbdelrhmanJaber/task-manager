import { Router } from "express";
import userControllers from "../controllers/user_controllers.js";
import {
  userCreateValidation,
  userUpdateValidation,
} from "../middleware/user_validation_schema.js";

const { getAllUsers, getUser, userRegister, updateUser, login, deleteUser } =
  userControllers;

const router = Router();

router.route("/").get(getAllUsers);

router.route("/register").post(userCreateValidation(), userRegister);

router.route("/login").post(login);

router
  .route("/:userID")
  .get(getUser)
  .patch(userUpdateValidation(), updateUser)
  .delete(deleteUser);

export default router;
