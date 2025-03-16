import dotenv from "dotenv";
import { server } from "./server.js";
import dbConnect from "./config/db_connection.js";

dotenv.config();

// Connect to database and start server
await dbConnect();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});
