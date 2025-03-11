import Category from "../models/category.js";
import Task from "../models/task.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";
import { validationResult } from "express-validator";
import categoryServices from "../services/category_services.js";

const handleInvalidCategoryID = (error, next) => {
  if (error.name === "CastError")
    return next(
      appError.createError("Invalid Category ID format", 400, httpStatus.FAIL)
    );
  next(error); //forward unexpected errors to the middleware
};

const getCategoryByID = async (req, res, next) => {
  try {
    const category = await categoryServices.getCategoryByID(
      req.params.categoryID
    );
    return res
      .status(200)
      .json({ status: httpStatus.SUCCESS, category: category });
  } catch (error) {
    handleInvalidCategoryID(error, next);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryServices.getAllCategories();
    return res
      .status(200)
      .json({ status: httpStatus.SUCCESS, categories: categories });
  } catch (error) {
    return next(
      appError.createError(error.message, error.status, httpStatus.ERROR)
    );
  }
};

const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));

  try {
    const newCategory = await categoryServices.getAllCategories();
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, new_category: newCategory });
  } catch (error) {
    next(appError.createError(error.message, error.status, httpStatus.ERROR));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = categoryServices.updateCategory(
      req.params.categoryID,
      req.body
    );
    res.status(200).json({
      status: httpStatus.SUCCESS,
      category_after_update: updatedCategory,
    });
  } catch (error) {
    handleInvalidCategoryID(error, next);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await categoryServices.deleteCategory(
      req.params.categoryID
    );
    res.status(200).json({
      status: httpStatus.SUCCESS,
      msg: `Category with ID : ${req.params.categoryID} is deleted`,
    });
  } catch (error) {
    handleInvalidCategoryID(error, next);
  }
};

export default {
  getCategoryByID,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
