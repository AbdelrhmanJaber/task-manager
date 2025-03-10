import { validationResult } from "express-validator";
import taskServices from "../services/task_services.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const handleInvalidTaskID = (error, next) => {
  if (error.name === "CastError")
    return next(
      appError.createError("Invalid Task ID format", 400, httpStatus.FAIL)
    );

  next(error); //forward unexpected errors to the middleware
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskServices.getTaskByID(req.params.taskID);
    return res.status(200).json({ status: httpStatus.SUCCESS, task: task });
  } catch (error) {
    handleInvalidTaskID(error, next);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskServices.getAllTasks();
    return res.status(200).json({ status: httpStatus.SUCCESS, Tasks: tasks });
  } catch (error) {
    return next(
      appError.createError(error.message, error.status, httpStatus.ERROR)
    );
  }
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));

  try {
    const newTask = await taskServices.createTask(req.body);
    res.status(200).json({ status: httpStatus.SUCCESS, new_task: newTask });
  } catch (error) {
    next(appError.createError(error.message, error.status, httpStatus.ERROR));
  }
};

const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskServices.updateTask(
      req.params.taskID,
      req.body
    );
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, task_after_update: updatedTask });
  } catch (error) {
    handleInvalidTaskID(error, next);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskServices.deleteTask(req.params.taskID);
    res.status(200).json({
      status: httpStatus.SUCCESS,
      msg: `Task with ID : ${req.params.taskID} is deleted`,
    });
  } catch (error) {
    handleInvalidTaskID(error, next);
  }
};

export default {
  getTask,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
