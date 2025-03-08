import { body } from "express-validator";
import { taskStatus } from "../utils/task_status.js";
import { taskPriority } from "../utils/task_priority.js";
import User from "../models/user.js";

const allowedStatus = Object.values(taskStatus);
const allowedPriority = Object.values(taskPriority);

const taskValidationSchemaFunc = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title at least is 2 digits"),
    body("description").notEmpty().withMessage("description is required"),
    body("status")
      .optional()
      .isIn(allowedStatus)
      .withMessage(
        `Invalid status. Must be one of: ${allowedStatus.join(", ")}`
      ),
    body("dueDate")
      .notEmpty()
      .withMessage("dueDate is required")
      .isISO8601()
      .withMessage("Invalid date format. Expected format: YYYY-MM-DD"),
    body("priority")
      .optional()
      .isIn(allowedPriority)
      .withMessage(
        `Invalid status. Must be one of: ${allowedPriority.join(", ")}`
      ),
    body("assignedTo")
      .notEmpty()
      .withMessage("Assigned to (email) is required")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (!user) {
          return Promise.reject(
            new Error("User with this email does not exist")
          );
        }
        req.body.assignedTo = user._id;
        return true;
      }),
  ];
};

export default taskValidationSchemaFunc;
