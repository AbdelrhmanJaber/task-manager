import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db_connection.js";
import taskRouter from "./routes/tasks_routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);

await dbConnect();
app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${process.env.PORT}`);
});
