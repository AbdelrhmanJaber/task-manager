import { body } from "express-validator";
import mongoose from "mongoose";
import userRepository from "../repository/user_repository.js";

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

const validateMessage = body("message")
  .notEmpty()
  .withMessage("Message is required")
  .isLength({ min: 5 })
  .withMessage("Message must be at least 5 characters long");

const notificationValidationSchema = () => [
  validateObjectId("user", userRepository.getUserById, "User not found"),
  validateMessage,
];

export default notificationValidationSchema;
