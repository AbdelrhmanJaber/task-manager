import { Router } from "express";
import searchAndFindTaskControllers from "../controllers/task_search_filter_controllers.js";
import searchAndFindSubtaskControllers from "../controllers/subtask_search_filter_controllers.js";
import verifyToken from "../middleware/verify_token.js";

const router = Router();

router.get(
  "/task",
  verifyToken,
  searchAndFindTaskControllers.searchAndFilterTasks
);
router.get(
  "/subtask",
  verifyToken,
  searchAndFindSubtaskControllers.searchAndFilterSubtasks
);

export default router;
