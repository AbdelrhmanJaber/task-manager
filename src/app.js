import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRouter from "./routes/tasks_routes.js";
import userRouter from "./routes/user_routes.js";
import categoryRouter from "./routes/category_routes.js";
import subtaskRouter from "./routes/subtasks_routes.js";
import notificationRouter from "./routes/notification_routes.js";
import searchAndFilterRouter from "./routes/search_and_filter_routes.js";
import https_status from "./utils/https_status.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subtasks", subtaskRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/searchAndFilter", searchAndFilterRouter);

// Global error handler for not found routes
app.all("*", (req, res) => {
  return res.status(404).json({
    status: https_status.ERROR,
    message: "This resource is not available",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.statusText || https_status.ERROR,
    message: error.message,
    code: error.status || 500,
    data: null,
  });
});

export default app;
