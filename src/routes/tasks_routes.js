import { Router } from "express";
import taskContoller from "../controllers/tasks_controllers.js";
import validationSchemaFunc from "../middleware/validation_schema.js";

const { getTask, getAllTasks, updateTask, createTask, deleteTask } =
  taskContoller;

const router = Router();

router.route("/").get(getAllTasks).post(validationSchemaFunc(), createTask);

router
  .route("/:taskID")
  .get(getTask)
  .patch(validationSchemaFunc(), updateTask)
  .delete(deleteTask);

export default router;
