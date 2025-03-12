import mongoose from "mongoose";
import { taskStatus } from "../utils/task_status.js";
import { taskPriority } from "../utils/task_priority.js";

const subtaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

const Subtask = mongoose.model("Subtask", subtaskSchema);
export default Subtask;
