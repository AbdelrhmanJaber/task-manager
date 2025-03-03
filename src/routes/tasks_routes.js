import { Router } from "express";
import taskContoller from "../controllers/tasks_controllers.js";
const { getTask, getAllTasks, updateTask, createTask, deleteTask } =
  taskContoller;

const router = Router();

router.route("/").get(getAllTasks).post(createTask);

router.route("/:taskID").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
