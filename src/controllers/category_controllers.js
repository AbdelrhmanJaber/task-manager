import Category from "../models/category.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";
import { validationResult } from "express-validator";

const handleInvalidCategoryID = (error, next) => {
  if (error.name === "CastError")
    return next(
      appError.createError("Invalid Category ID format", 400, httpStatus.FAIL)
    );
  next(error); //forward unexpected errors to the middleware
};

const getCategoryByID = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryID);
    if (!category)
      return next(
        appError.createError(
          "This category is not found",
          404,
          httpStatus.ERROR
        )
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
    const categories = await Category.find().lean();
    if (categories.length === 0) {
      return next(
        appError.createError("No Tasks in database", 404, httpStatus.FAIL)
      );
    }
    return res
      .status(200)
      .json({ status: httpStatus.SUCCESS, categories: categories });
  } catch (error) {
    return next(appError.createError(error.message, 500, httpStatus.ERROR));
  }
};

const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(appError.createError(errors.array(), 400, httpStatus.FAIL));

  try {
    const newCategory = await Task.create(req.body);
    res
      .status(200)
      .json({ status: httpStatus.SUCCESS, new_category: newCategory });
  } catch (error) {
    next(appError.createError(error.message, 500, httpStatus.ERROR));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.categoryID;
    const updateCategory = await Category.findByIdAndUpdate(
      categoryID,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updateCategory) {
      return next(
        appError.createError(
          "This Category is not found",
          404,
          httpStatus.ERROR
        )
      );
    }
    res.status(200).json({
      status: httpStatus.SUCCESS,
      category_after_update: updateCategory,
    });
  } catch (error) {
    handleInvalidCategoryID(error, next);
  }
};

const deleteCategory = async (req, res, next) => {
  const categoryID = req.params.categoryID;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryID);
    if (!deletedCategory) {
      return next(
        appError.createError(
          "This Category is not found",
          404,
          httpStatus.ERROR
        )
      );
    } else {
      res.status(200).json({
        status: httpStatus.SUCCESS,
        msg: `Category with ID : ${categoryID} is deleted`,
      });
    }
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
