import notification from "../models/notification.js";
import userRepository from "../repository/user_repository.js";

class notificationRepository {
  async createNotification(notificationData) {
    return await notification.create(notificationData);
  }

  async getNotificationsByUser(userID) {
    return await notification.find({ user: userID }).sort({ createdAt: -1 });
  }

  async sendNotificationToAllUsers(message, type = "General") {
    const users = await userRepository.getAllUsers();
    const notifications = users.map((user) => ({
      user: user._id,
      message,
      type,
    }));
    await notification.insertMany(notifications);
    return users;
  }
}

export default new notificationRepository();
