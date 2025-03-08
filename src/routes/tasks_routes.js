import { Router } from "express";
import taskContoller from "../controllers/tasks_controllers.js";
import taskValidationSchemaFunc from "../middleware/task_validation_schema.js";
import verifyToken from "../middleware/verify_token.js";
import isAuthorized from "../middleware/is_authorized.js";
import userRoles from "../utils/user_roles.js";

const { getTask, getAllTasks, updateTask, createTask, deleteTask } =
  taskContoller;

const router = Router();

router
  .route("/")
  .get(getAllTasks)
  .post(
    taskValidationSchemaFunc(),
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    createTask
  );

router
  .route("/:taskID")
  .get(getTask)
  .patch(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    updateTask
  )
  .delete(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    deleteTask
  );

export default router;
