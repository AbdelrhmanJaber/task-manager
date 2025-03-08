import { Timestamp } from "bson";
import mongoose from "mongoose";
import { taskStatus } from "../utils/task_status.js";
import { taskPriority } from "../utils/task_priority.js";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [taskStatus.PENDING, taskStatus.INPROGRESS, taskStatus.Completed],
      default: taskStatus.PENDING,
      index: true,
    },
    priority: {
      type: String,
      enum: [taskPriority.HIGH, taskPriority.MEDIUM, taskPriority.LOW],
      default: taskPriority.MEDIUM,
      index: true,
    },
    dueDate: {
      type: Date,
      index: true,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
