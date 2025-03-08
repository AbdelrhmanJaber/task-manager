import { Router } from "express";
import userControllers from "../controllers/user_controllers.js";
import {
  userCreateValidation,
  userUpdateValidation,
} from "../middleware/user_validation_schema.js";
import userRoles from "../utils/user_roles.js";
import verifyToken from "../middleware/verify_token.js";
import isAuthorized from "../middleware/is_authorized.js";

const { getAllUsers, getUser, userRegister, updateUser, login, deleteUser } =
  userControllers;

const router = Router();

router.route("/").get(getAllUsers);

router.route("/register").post(userCreateValidation(), userRegister);

router.route("/login").post(login);

router
  .route("/:userID")
  .get(getUser)
  .patch(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    userUpdateValidation(),
    updateUser
  )
  .delete(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    deleteUser
  );

export default router;
