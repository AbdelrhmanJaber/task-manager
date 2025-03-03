import { connect } from "mongoose";
import { exit } from "process";

const dbConnect = async () => {
  try {
    const mongooseConnection = await connect(process.env.MONGO_URL);
    console.log("Mongoose database is connected");
  } catch (error) {
    console.log(`Database Connection is failed : ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
