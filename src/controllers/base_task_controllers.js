import httpStatus from "../utils/https_status.js";
import appError from "../utils/app_error.js";
import notificationService from "../services/notification_services.js";

class baseTaskContoller {
  constructor(service) {
    this.service = service;
  }

  handleInvalidID = (error, next) => {
    if (error.name === "CastError")
      return next(
        appError.createError("Invalid Task ID format", 400, httpStatus.FAIL)
      );

    next(error); //forward unexpected errors to the middleware
  };

  getByID = async (req, res, next) => {
    try {
      const entity = await this.service.getByID(req.params.ID);
      return res.status(200).json({ status: httpStatus.SUCCESS, data: entity });
    } catch (error) {
      this.handleInvalidID(error, next);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const entities = await this.service.getAll();
      return res
        .status(200)
        .json({ status: httpStatus.SUCCESS, data: entities });
    } catch (error) {
      return next(
        appError.createError(error.message, error.status, httpStatus.ERROR)
      );
    }
  };

  create = async (req, res, next) => {
    try {
      const newEntity = await this.service.create(req.body);
      res.status(200).json({ status: httpStatus.SUCCESS, data: newEntity });
      const message = `A new task "${newEntity.title}" has been assigned to you.`;
      await notificationService.createNotifcation(
        newEntity.assignedTo,
        message
      );
    } catch (error) {
      next(appError.createError(error.message, error.status, httpStatus.ERROR));
    }
  };

  update = async (req, res, next) => {
    try {
      const task = await this.service.getByID(req.params.ID);
      const updatedEntity = await this.service.update(req.params.ID, req.body);
      res.status(200).json({ status: httpStatus.SUCCESS, data: updatedEntity });
      const message = `A new task update "${task.title}" has been changed.`;
      await notificationService.createNotifcation(task.assignedTo, message);
    } catch (error) {
      this.handleInvalidID(error, next);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deletedEntity = await this.service.delete(req.params.ID);
      res.status(200).json({
        status: httpStatus.SUCCESS,
        msg: `Resource with ID : ${req.params.ID} is deleted`,
      });
    } catch (error) {
      this.handleInvalidID(error, next);
    }
  };
}

export default baseTaskContoller;
