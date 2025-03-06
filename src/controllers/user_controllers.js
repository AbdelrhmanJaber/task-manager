import User from "../models/user.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";
import bcrypt from "bcrypt";
import generateTokenFunc from "../utils/generate_jwt.js";
import { validationResult } from "express-validator";

const handleInvalidUserID = (error, next) => {
  if (error.name === "CastError")
    return next(
      appError.createError("Invalid User ID format", 400, httpStatus.FAIL)
    );

  next(error); //forward unexpected errors to the middleware
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    if (users.length === 0) {
      return next(
        appError.createError("No users in database", 404, httpStatus.FAIL)
      );
    }
    return res.status(200).json({ status: httpStatus.SUCCESS, Users: users });
  } catch (error) {
    return next(appError.createError(error.message, 500, httpStatus.ERROR));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return next(
        appError.createError("This user is not found", 404, httpStatus.FAIL)
      );
    }
    res.status(200).json({ status: httpStatus.SUCCESS, user: user });
  } catch (error) {
    handleInvalidUserID(error, next);
  }
};

const userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));
  try {
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const token = generateTokenFunc({
      email: newUser.email,
      id: newUser._id,
      role: newUser.role,
    });
    newUser.token = token;
    await newUser.save();
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, user_registeration: newUser });
  } catch (error) {
    //CHECK IF THERE IS A DUPLICATE KEY FOR THE UNIQUE EMAIL
    if (error.code === 11000) {
      const error = appError.createError(
        "This Email is already exist",
        400,
        httpStatus.ERROR
      );
      return next(error);
    }
    next(error); //FORWARD UNEXPECTED ERROS TO MIDDLEWARES
  }
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));
  try {
    const userID = req.params.userID;
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return next(
        appError.createError("This User is not found", 404, httpStatus.ERROR)
      );
    }
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
    if (!email || !password) {
      return next(
        appError.createError(
          "Email and password are required",
          400,
          httpStatus.ERROR
        )
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        appError.createError(
          "Email or password is wrong",
          404,
          httpStatus.ERROR
        )
      );
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return next(
        appError.createError(
          "Email or password is wrong",
          404,
          httpStatus.ERROR
        )
      );
    }
    const token = generateTokenFunc({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    res.status(200).json({ status: httpStatus.SUCCESS, user_token: token });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const deletedUser = await User.findByIdAndDelete(userID);
    if (!deletedUser) {
      return next(
        appError.createError("This User is not found", 404, httpStatus.ERROR)
      );
    } else {
      res.status(200).json({
        status: httpStatus.SUCCESS,
        msg: `User with ID : ${userID} is deleted`,
      });
    }
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
