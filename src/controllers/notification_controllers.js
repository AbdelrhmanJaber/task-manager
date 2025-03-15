import notificationService from "../services/notification_services.js";
import httpStatus from "../utils/https_status.js";
import appError from "../utils/app_error.js";

const handleInvalidID = (error, next) => {
  if (error.name === "CastError")
    return next(
      appError.createError(
        "Invalid Notification ID format",
        400,
        httpStatus.FAIL
      )
    );
  next(error); //forward unexpected errors to the middleware
};

const createNotification = async (req, res, next) => {
  try {
    const { userID, message } = req.body;
    const notification = await notificationService.createNotification(
      userID,
      message
    );
    res.status(201).json({ status: httpStatus.SUCCESS, notification });
  } catch (error) {
    handleInvalidID(error, next);
  }
};

const sendNotificationToAll = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      appError.createError("Message is required", 400, httpStatus.ERROR);
    }
    await notificationService.sendNotificationToAll(message);
    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Mails are sent to the users",
    });
  } catch (error) {
    handleInvalidID(error, next);
  }
};

const getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(
      req.params.userID
    );
    res.status(200).json({ status: httpStatus.SUCCESS, notifications });
  } catch (error) {
    handleInvalidID(error, next);
  }
};

export default {
  createNotification,
  sendNotificationToAll,
  getUserNotifications,
};
