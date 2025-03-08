import appError from "../utils/app_error.js";
import httpsStatus from "../utils/https_status.js";

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appError.createError(
          "This user is unauthorized",
          401,
          httpsStatus.ERROR
        )
      );
    }
    next();
  };
};

export default isAuthorized;
