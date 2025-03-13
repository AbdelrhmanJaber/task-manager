import baseTaskContoller from "./base_task_controllers.js";
import taskService from "../services/task_services.js";

class taskContoller extends baseTaskContoller {
  constructor() {
    super(taskService);
  }
  delete = async (req, res, next) => {
    try {
      await this.service.deleteTask(req.params.ID);
      res.status(200).json({
        status: httpStatus.SUCCESS,
        msg: `Task with ID : ${req.params.ID} is deleted`,
      });
    } catch (error) {
      this.handleInvalidID(error, next);
    }
  };
}

export default new taskContoller();
