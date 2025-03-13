import { body } from "express-validator";
import mongoose from "mongoose";

const validateObjectId = (field, repositoryMethod, errorMessage) => {
  return body(field)
    .notEmpty()
    .withMessage(`${field} is required`)
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return Promise.reject(new Error(`Invalid ${field} ID format`));
      }
      const entity = await repositoryMethod(value);
      if (!entity) {
        return Promise.reject(new Error(errorMessage));
      }
      return true;
    });
};

const validateTitle = body("title")
  .notEmpty()
  .withMessage("Title is required")
  .isLength({ min: 2 })
  .withMessage("Title must be at least 2 characters long");

const validateDescription = body("description")
  .notEmpty()
  .withMessage("Description is required");

const validateStatus = (allowedStatus) =>
  body("status")
    .optional()
    .isIn(allowedStatus)
    .withMessage(`Invalid status. Must be one of: ${allowedStatus.join(", ")}`);

const validatePriority = (allowedPriority) =>
  body("priority")
    .optional()
    .isIn(allowedPriority)
    .withMessage(
      `Invalid priority. Must be one of: ${allowedPriority.join(", ")}`
    );

const validateDueDate = body("dueDate")
  .notEmpty()
  .withMessage("Due date is required")
  .isISO8601()
  .withMessage("Invalid date format. Expected format: YYYY-MM-DD");

export {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
  validateDueDate,
  validateObjectId,
};
