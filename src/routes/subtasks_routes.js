import { Router } from "express";
import subtaskController from "../controllers/subtasks_controllers.js";
import subtaskValidationSchema from "../middleware/subtask_validation_schema.js";
import validateRequest from "../middleware/validation_request.js";
import verifyToken from "../middleware/verify_token.js";
import isAuthorized from "../middleware/is_authorized.js";
import userRoles from "../utils/user_roles.js";

const router = Router();

router
  .route("/")
  .get(subtaskController.getAll)
  .post(
    subtaskValidationSchema(),
    validateRequest,
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    subtaskController.create
  );

router
  .route("/:ID")
  .get(subtaskController.getByID)
  .patch(
    validateRequest,
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    subtaskController.update
  )
  .delete(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    subtaskController.delete
  );

export default router;
