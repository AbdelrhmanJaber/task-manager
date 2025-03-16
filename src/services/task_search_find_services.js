import taskSearchAndFilterRepository from "../repository/task_search_filter_repository.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

class taskSearchAndFilterServices {
  async searchAndFilter(query) {
    const queryResult = await taskSearchAndFilterRepository.searchAndFilter(
      query
    );
    if (!queryResult.length || !queryResult) {
      throw appError.createError("Not found query", 404, httpStatus.ERROR);
    }
    return queryResult;
  }
}

export default new taskSearchAndFilterServices();
