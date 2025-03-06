import mongoose from "mongoose";
import userRoles from "../utils/user_roles.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.MANAGER, userRoles.ADMIN, userRoles.USER],
    default: userRoles.USER,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
