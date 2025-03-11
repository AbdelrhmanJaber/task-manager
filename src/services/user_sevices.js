import userRepository from "../repository/user_repository.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";
import bcrypt from "bcrypt";
import generateTokenFunc from "../utils/generate_jwt.js";

const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  if (!users.length) {
    throw appError.createError("No users in database", 404, httpStatus.FAIL);
  }
  return users;
};

const getUserById = async (userID) => {
  const user = await userRepository.getUserById(userID);
  if (!user) {
    throw appError.createError("This user is not found", 404, httpStatus.FAIL);
  }
  return user;
};

const createUser = async (newAddedUser) => {
  const newUser = userRepository.createUser(newAddedUser);
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const token = generateTokenFunc({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await userRepository.saveUser(newUser);
};

const updatedUser = async (userID, updatedUser) => {
  const user = await userRepository.getUserById(userID);
  if (!user) {
    throw appError.createError("This User is not found", 404, httpStatus.ERROR);
  }
  Object.assign(user, updatedUser);
  if (updatedUser.password) {
    user.password = await bcrypt.hash(updatedUser.password, 10);
  }
  await userRepository.saveUser(user);
  return user;
};

const deleteUser = async (userID) => {
  const deletedUser = await userRepository.deleteUser(userID);
  if (!deletedUser) {
    throw appError.createError("This User is not found", 404, httpStatus.ERROR);
  }
  return deletedUser;
};

const userLogin = async (email, password) => {
  if (!email || !password) {
    throw new appError.createError(
      "Email and password are required",
      400,
      httpStatus.ERROR
    );
  }

  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new appError.createError(
      "Email or password is incorrect",
      404,
      httpStatus.ERROR
    );
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new appError.createError(
      "Email or password is incorrect",
      404,
      httpStatus.FAIL
    );
  }

  const token = generateTokenFunc({
    email: user.email,
    id: user._id,
    role: user.role,
  });

  return token;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updatedUser,
  deleteUser,
  userLogin,
};
