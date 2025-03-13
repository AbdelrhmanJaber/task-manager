import { Router } from "express";
import TaskController from "../controllers/task_controllers.js";
import taskValidationSchema from "../middleware/task_validation_schema.js";
import validation_request from "../middleware/validation_request.js";
import verifyToken from "../middleware/verify_token.js";
import isAuthorized from "../middleware/is_authorized.js";
import userRoles from "../utils/user_roles.js";

const router = Router();

router
  .route("/")
  .get(TaskController.getAll)
  .post(
    taskValidationSchema(),
    validation_request,
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    TaskController.create
  );

router
  .route("/:ID")
  .get(TaskController.getByID)
  .patch(
    validation_request,
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    TaskController.update
  )
  .delete(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    TaskController.delete
  );

export default router;
