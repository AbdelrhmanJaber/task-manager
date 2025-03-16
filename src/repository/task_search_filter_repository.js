import baseSearchFilter from "./base_search_filter_repository.js";
import Task from "../models/task.js";

class taskSearchAndFilterRepository extends baseSearchFilter {
  constructor() {
    super(Task);
  }
}

export default new taskSearchAndFilterRepository();
