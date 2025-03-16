import subtaskSearchAndFilterServices from "../services/subtask_search_filter_services.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const searchAndFilterSubtasks = async (req, res, next) => {
  try {
    const queryResult = await subtaskSearchAndFilterServices.searchAndFilter(
      req.query
    );
    res.status(200).json({ status: httpStatus.SUCCESS, queryResult });
  } catch (error) {
    next(appError.createError(error.message, error.status, httpStatus.ERROR));
  }
};

export default { searchAndFilterSubtasks };
