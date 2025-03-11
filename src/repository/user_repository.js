import User from "../models/user.js";

class userRepository {
  static async getAllUsers() {
    return await User.find().lean();
  }

  static async getUserById(userID) {
    return await User.findById(userID);
  }

  static createUser(newUser) {
    return new User(newUser);
  }

  static async saveUser(newUser) {
    return newUser.save();
  }

  static async deleteUser(userID) {
    return await User.findByIdAndDelete(userID);
  }
  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default userRepository;
