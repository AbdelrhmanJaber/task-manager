import subtaskService from "../services/subtask_services.js";
import baseTaskContoller from "./base_task_controllers.js";

class subtaskContoller extends baseTaskContoller {
  constructor() {
    super(subtaskService);
  }
}

export default new subtaskContoller();
