import appError from "../utils/app_error";
import httpsStatus from "../utils/https_status";

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
  };
};

export default isAuthorized;
