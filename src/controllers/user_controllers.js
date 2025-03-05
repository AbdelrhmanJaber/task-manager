import User from "../models/user.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

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
    const user = await User.findById(req.body.userID);
    if (!user) {
      return next(
        appError.createError("This user is not found", 404, httpStatus.FAIL)
      );
    }
    return res.status(200).json({ status: httpStatus.SUCCESS, user: user });
  } catch (error) {
    handleInvalidUserID(error, next);
  }
};

export default {
  getAllUsers,
  getUser,
};
