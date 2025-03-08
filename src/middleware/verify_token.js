import jwt from "jsonwebtoken";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    return next(
      appError.createError("Token is required !!", 401, httpStatus.ERROR)
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser; //to be authorized in the next middleware or next route
    next();
  } catch (error) {
    return next(appError.createError("Invalid Token", 401, httpStatus.ERROR));
  }
};

export default verifyToken;
