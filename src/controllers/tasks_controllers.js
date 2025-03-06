import { validationResult } from "express-validator";
import Task from "../models/task.js";
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
    const task = await Task.findById(req.params.taskID);
    if (!task)
      return next(
        appError.createError("This Task is not found", 404, httpStatus.ERROR)
      );

    return res.status(200).json({ status: httpStatus.SUCCESS, task: task });
  } catch (error) {
    handleInvalidTaskID(error, next);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().lean();
    if (tasks.length === 0) {
      return next(
        appError.createError("No Tasks in database", 404, httpStatus.FAIL)
      );
    }
    return res.status(200).json({ status: httpStatus.SUCCESS, Tasks: tasks });
  } catch (error) {
    return next(appError.createError(error.message, 500, httpStatus.ERROR));
  }
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));

  try {
    const newTask = await Task.create(req.body);
    res.status(200).json({ status: httpStatus.SUCCESS, new_task: newTask });
  } catch (error) {
    next(appError.createError(error.message, 500, httpStatus.ERROR));
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskID = req.params.taskID;
    const updatedTask = await Task.findByIdAndUpdate(
      taskID,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return next(
        appError.createError("This Task is not found", 404, httpStatus.ERROR)
      );
    }
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, task_after_update: updatedTask });
  } catch (error) {
    handleInvalidTaskID(error, next);
  }
};

const deleteTask = async (req, res, next) => {
  const taskID = req.params.taskID;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskID);
    if (!deletedTask) {
      return next(
        appError.createError("This Task is not found", 404, httpStatus.ERROR)
      );
    } else {
      res.status(200).json({
        status: httpStatus.SUCCESS,
        msg: `Task with ID : ${taskID} is deleted`,
      });
    }
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
