import baseSearchFilter from "./base_search_filter_repository.js";
import Subtask from "../models/subtask.js";

class subtaskSearchAndFilterRepository extends baseSearchFilter {
  constructor() {
    super(Subtask);
  }
}

export default new subtaskSearchAndFilterRepository();
