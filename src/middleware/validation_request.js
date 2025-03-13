import { validationResult } from "express-validator";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));
  }
  next();
};

export default validateRequest;
