import Task from "../models/task.js";

class taskFactory {
  async getTaskByID(taskID) {
    return await Task.findById(taskID);
  }

  async getAllTasks() {
    return await Task.find().lean();
  }

  async createTask(newTask) {
    return await Task.create(newTask);
  }

  async updateTask(taskID, updatedTask) {
    return await Task.findByIdAndUpdate(
      taskID,
      { $set: updatedTask },
      { new: true, runValidators: true }
    );
  }

  async deleteTask(taskID) {
    return await Task.findByIdAndDelete(taskID);
  }
}

export default taskFactory;
