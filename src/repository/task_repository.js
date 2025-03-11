import Task from "../models/task.js";

class taskRepository {
  static async getTaskByID(taskID) {
    return await Task.findById(taskID);
  }

  static async getAllTasks() {
    return await Task.find().lean();
  }

  static async createTask(newTask) {
    return await Task.create(newTask);
  }

  static async updateTask(taskID, updatedTask) {
    return await Task.findByIdAndUpdate(
      taskID,
      { $set: updatedTask },
      { new: true, runValidators: true }
    );
  }

  static async deleteTask(taskID) {
    return await Task.findByIdAndDelete(taskID);
  }

  static async deleteTasksOfCategory(categoryID) {
    return await Task.deleteMany({ category: categoryID });
  }
}

export default taskRepository;
