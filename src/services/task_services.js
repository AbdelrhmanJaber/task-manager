import taskFactoryClass from "../factories/task_factory.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const taskFactory = new taskFactoryClass();

const getTaskByID = async (taskID) => {
  const task = await taskFactory.getTaskByID(taskID);
  if (!task)
    throw appError.createError("This Task is not found", 404, httpStatus.ERROR);
  return task;
};

const getAllTasks = async () => {
  const tasks = await taskFactory.getAllTasks();
  if (tasks.length === 0)
    throw appError.createError("No Tasks in database", 404, httpStatus.FAIL);
  return tasks;
};

const createTask = async (newTask) => {
  return await taskFactory.createTask(newTask);
};

const updateTask = async (taskID, updateTask) => {
  const newUpdatedTask = await taskFactory.updateTask(taskID, updateTask);
  if (!newUpdatedTask)
    throw appError.createError("This Task is not found", 404, httpStatus.ERROR);
  return newUpdatedTask;
};

const deleteTask = async (taskID) => {
  const deletedTask = await taskFactory.deleteTask(taskID);
  if (!deletedTask)
    throw appError.createError("This Task is not found", 404, httpStatus.ERROR);
  return deletedTask;
};

export default {
  getTaskByID,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
