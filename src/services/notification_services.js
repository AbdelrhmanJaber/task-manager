import notificationRepository from "../repository/notification_repository.js";
import sendEmail from "./email_services.js";
import { io } from "../server.js";
import userRepository from "../repository/user_repository.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

class notificationService {
  async createNotification(userID, message) {
    const notification = await notificationRepository.createNotification({
      user: userID,
      message,
    });
    io.to(userID).emit("notification", notification);
    const user = await userRepository.getUserById(userID);
    if (user) {
      await sendEmail(user.email, "New Notification", message);
    } else {
      throw appError.createError(
        "This user is not found",
        404,
        httpStatus.ERROR
      );
    }

    return notification;
  }

  async sendNotificationToAll(message) {
    const users = await notificationRepository.sendNotificationToAllUsers(
      message
    );
    users.forEach((user) => {
      io.to(user._id).emit("notification", { message });
    });
    await Promise.all(
      users.map((user) => sendEmail(user.email, "New Notification", message))
    );
  }

  async getUserNotifications(userID) {
    return await notificationRepository.getNotificationsByUser(userID);
  }
}

export default new notificationService();
