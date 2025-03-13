import Subtask from "../models/subtask.js";
import baseTaskRepository from "./base_task_repository.js";

class subtaskRepository extends baseTaskRepository {
  constructor() {
    super(Subtask);
  }
}

export default new subtaskRepository();
