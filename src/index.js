import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db_connection.js";
import taskRouter from "./routes/tasks_routes.js";
import userRouter from "./routes/user_routes.js";
import categoryRouter from "./routes/category_routes.js";
import subtaskRouter from "./routes/subtasks_routes.js";
import https_status from "./utils/https_status.js";
import http from "http";
import { Server } from "socket.io";
import notificationRouter from "./routes/notification_routes.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

// Store connected users
const users = {};

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("registerUser", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subtasks", subtaskRouter);
app.use("/api/notification", notificationRouter);
//global error handler for not found routes

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: https_status.ERROR,
    message: "This resourse is not available",
  });
});

//global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.statusText || https_status.ERROR,
    message: error.message,
    code: error.status || 500,
    data: null,
  });
});

await dbConnect();
app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${process.env.PORT}`);
});

export { io };
