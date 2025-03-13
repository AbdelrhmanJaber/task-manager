import subtaskRepository from "../repository/subtask_repository.js";
import baseTaskService from "./base_task_services.js";

class subtaskService extends baseTaskService {
  constructor() {
    super(subtaskRepository);
  }
}

export default new subtaskService();
