import taskSearchAndFilterServices from "../services/task_search_find_services.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const searchAndFilterTasks = async (req, res, next) => {
  try {
    const queryResult = await taskSearchAndFilterServices.searchAndFilter(
      req.query
    );
    res.status(200).json({ status: httpStatus.SUCCESS, queryResult });
  } catch (error) {
    next(appError.createError(error.message, error.status, httpStatus.ERROR));
  }
};

export default { searchAndFilterTasks };
