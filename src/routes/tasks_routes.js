import { Router } from "express";
import taskContoller from "../controllers/tasks_controllers.js";
import taskValidationSchemaFunc from "../middleware/task_validation_schema.js";

const { getTask, getAllTasks, updateTask, createTask, deleteTask } =
  taskContoller;

const router = Router();

router.route("/").get(getAllTasks).post(taskValidationSchemaFunc(), createTask);

router.route("/:taskID").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
