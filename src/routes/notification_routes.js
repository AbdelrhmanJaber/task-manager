import { Router } from "express";
import notificationController from "../controllers/notification_controllers.js";
import verifyToken from "../middleware/verify_token.js";
import isAuthorized from "../middleware/is_authorized.js";
import userRoles from "../utils/user_roles.js";
import validation_request from "../middleware/validation_request.js";
import notificationValidationSchema from "../middleware/notification_validation_schema.js";

const router = Router();

router.post(
  "/",
  notificationValidationSchema(),
  validation_request,
  verifyToken,
  isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
  notificationController.createNotification
);
router.post(
  "/announcement",
  verifyToken,
  isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
  notificationController.sendNotificationToAll
);

router.get("/:userID", notificationController.getUserNotifications);

export default router;
