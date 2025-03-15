import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import dbConnect from "./config/db_connection.js";

dotenv.config();

const server = http.createServer(app);

// Initialize WebSocket server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("registerUser", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Connect to database and start server
await dbConnect();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});

export { io };
