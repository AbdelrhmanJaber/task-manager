class base_search_filter {
  constructor(model) {
    this.model = model;
  }

  buildFilter(query) {
    const filter = {};
    if (query.title) {
      filter.title = { $regex: query.title, $options: "i" };
    }
    if (query.status) {
      filter.status = query.status;
    }
    if (query.priority) {
      filter.priority = query.priority;
    }
    if (query.startDate || query.endDate) {
      filter.dueDate = {};
      if (query.startDate) filter.dueDate.$gte = new Date(query.startDate);
      if (query.endDate) filter.dueDate.$lte = new Date(query.endDate);
    }
    if (query.assignedTo) {
      filter.assignedTo = query.assignedTo;
    }
    return filter;
  }
  async searchAndFilter(query) {
    const filter = this.buildFilter(query);
    return await this.model.find(filter).lean();
  }
}

export default base_search_filter;
