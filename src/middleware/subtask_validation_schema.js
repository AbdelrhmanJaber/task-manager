import {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
  validateDueDate,
  validateObjectId,
} from "./base_task_validation.js";
import { taskStatus } from "../utils/task_status.js";
import { taskPriority } from "../utils/task_priority.js";
import userRepository from "../repository/user_repository.js";
import taskRepository from "../repository/task_repository.js";

const subtaskValidationSchema = () => [
  validateTitle,
  validateDescription,
  validateStatus(Object.values(taskStatus)),
  validatePriority(Object.values(taskPriority)),
  validateDueDate,
  validateObjectId(
    "assignedTo",
    userRepository.getUserById,
    "Assigned user not found"
  ),
  validateObjectId("task", taskRepository.getById, "Parent task not found"),
];

export default subtaskValidationSchema;
