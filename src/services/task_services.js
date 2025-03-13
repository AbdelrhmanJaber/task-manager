import taskRepository from "../repository/task_repository.js";
import baseTaskService from "./base_task_services.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

class taskService extends baseTaskService {
  constructor() {
    super(taskRepository);
  }

  async deleteTask(taskID) {
    const deletedTask = await taskRepository.deleteTaskAndSubtasks(taskID);
    if (!deletedTask) {
      throw appError.createError(
        "This Task is not found",
        404,
        httpStatus.ERROR
      );
    }
    return deletedTask;
  }
}

export default new taskService();
