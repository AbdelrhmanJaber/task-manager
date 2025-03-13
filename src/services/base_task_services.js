import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

class baseTaskService {
  constructor(repository) {
    this.repository = repository;
  }

  checkEntityFound(entity) {
    if (!entity) {
      throw appError.createError(
        "This resource is not found",
        404,
        httpStatus.ERROR
      );
    }
  }

  async getByID(id, populateFields = []) {
    const entity = await this.repository.getByID(id, populateFields);
    this.checkEntityFound(entity);
    return entity;
  }

  async getAll() {
    const entities = await this.repository.getAll();
    if (entities.length === 0) {
      throw appError.createError(
        "No resources in the database",
        404,
        httpStatus.ERROR
      );
    }
    return entities;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, updatedData) {
    const newUpdatedTask = await this.repository.update(id, updatedData);
    this.checkEntityFound(newUpdatedTask);
    return newUpdatedTask;
  }

  async delete(id) {
    const deletedTask = await this.repository.delete(id);
    this.checkEntityFound(deletedTask);
    return deletedTask;
  }
}

export default baseTaskService;
