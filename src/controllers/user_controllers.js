import { validationResult } from "express-validator";
import userServices from "../services/user_sevices.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const handleInvalidUserID = (error, next) => {
  if (error.name === "CastError") {
    return next(
      appError.createError("Invalid User ID format", 400, httpStatus.FAIL)
    );
  }
  next(error);
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json({ status: httpStatus.SUCCESS, Users: users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userServices.getUserById(req.params.userID);
    res.status(200).json({ status: httpStatus.SUCCESS, user: user });
  } catch (error) {
    handleInvalidUserID(error, next);
  }
};

const userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));
  }
  try {
    const newUser = await userServices.createUser(req.body);
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, user_registration: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        appError.createError("This Email already exists", 400, httpStatus.ERROR)
      );
    }
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));
  }
  try {
    const updatedUser = await userServices.updatedUser(
      req.params.userID,
      req.body
    );
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, user_after_update: updatedUser });
  } catch (error) {
    handleInvalidUserID(error, next);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userServices.userLogin(email, password);
    res.status(200).json({ status: httpStatus.SUCCESS, user_token: token });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userServices.deleteUser(req.params.userID);
    res.status(200).json({
      status: httpStatus.SUCCESS,
      msg: `User with ID: ${req.params.userID} has been deleted`,
    });
  } catch (error) {
    handleInvalidUserID(error, next);
  }
};

export default {
  getAllUsers,
  getUser,
  userRegister,
  updateUser,
  login,
  deleteUser,
};
