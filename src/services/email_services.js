import nodemailer from "nodemailer";
import dotenv from "dotenv";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_MANAGER,
    pass: process.env.PASS_MANAGER,
  },
});

const sendEmail = async (recipient, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_MANAGER,
      to: recipient,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border-radius: 8px; background-color: #f8f9fa;">
          <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px 8px 0 0;">
            📢 You got a new notification from Task Manager
          </div>
          <div style="padding: 15px; background-color: white; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; text-align: center;">${text}</p>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw appError.createError("Fail Sending Email", 400, httpStatus.FAIL);
  }
};

export default sendEmail;
