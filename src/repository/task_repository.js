import Task from "../models/task.js";
import Subtask from "../models/subtask.js";
import baseTaskRepository from "./base_task_repository.js";

class taskRepository extends baseTaskRepository {
  constructor() {
    super(Task);
  }

  //delete all subtasks that belong this task
  async deleteTaskAndSubtasks(taskID) {
    await Subtask.deleteMany({ task: taskID });
    return await this.model.findByIdAndDelete(taskID);
  }

  async deleteTasksOfCategory(categoryID) {
    return await this.model.deleteMany({ category: categoryID });
  }
}

export default new taskRepository();
