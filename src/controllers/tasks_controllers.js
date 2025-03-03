import Task from "../models/task.js";
import appError from "../utils/app_error.js";

const getTask = async (req, res) => {
  const task = await Task.findById(req.params.taskID);
  const count = await Task.estimatedDocumentCount();
  if (!count) {
    res.status(400).json({ msg: "The database is empty" });
  } else {
    if (!task) {
      res.status(404).json({ msg: "this task is not found" });
    } else {
      res.status(200).json(task);
    }
  }
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  const count = await Task.estimatedDocumentCount();
  if (!count) {
    // res.status(400).json({ msg: "The database is empty" });
    const error = appError.createError("No Tasks in database", 404, "FAIL");
    res.json(error);
  } else {
    res.status(200).json(tasks);
  }
};

const createTask = async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(200).json(newTask);
};

const updateTask = async (req, res) => {
  const taskID = req.params.taskID;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskID },
    { $set: { ...req.body } },
    { new: true }
  );
  if (!updatedTask) {
    res.status(404).json({ msg: "Task is not found" });
  } else {
    res.status(200).json(updatedTask);
  }
};

const deleteTask = async (req, res) => {
  const taskID = req.params.taskID;
  const deletedTask = await Task.findOneAndDelete({ _id: taskID });
  if (!deletedTask) {
    res.status(404).json({ msg: "Task is not found" });
  } else {
    res.status(200).json("Task is deleted");
  }
};

export default {
  getTask,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
