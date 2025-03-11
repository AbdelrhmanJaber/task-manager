import categoryRepository from "../repository/category_repository.js";
import taskRepository from "../repository/task_repository.js";
import appError from "../utils/app_error.js";
import httpStatus from "../utils/https_status.js";

const getCategoryByID = async (categoryID) => {
  const category = await categoryRepository.getCategoryByID(categoryID);
  if (!category) {
    throw appError.createError(
      "This category is not found",
      404,
      httpStatus.ERROR
    );
  }
  return category;
};

const getAllCategories = async () => {
  const categories = await categoryRepository.getAllCategories();
  if (categories.length === 0) {
    throw appError.createError(
      "No Categories in database",
      404,
      httpStatus.FAIL
    );
  }
  return categories;
};

const createCategory = async (newCategory) => {
  await categoryRepository.createCategory(newCategory);
};

const updateCategory = async (categoryID, newUpdatedCategory) => {
  const updatedCategory = await categoryRepository.updateCategory(
    categoryID,
    newUpdatedCategory
  );
  if (!updatedCategory) {
    throw appError.createError(
      "This Category is not found",
      404,
      httpStatus.ERROR
    );
  }
  return updatedCategory;
};

const deleteCategory = async (categoryID) => {
  const deletedCategory = await categoryRepository.deleteCategory(categoryID);
  if (!deletedCategory) {
    throw appError.createError(
      "This Category is not found",
      404,
      httpStatus.ERROR
    );
  }
  await taskRepository.deleteTasksOfCategory(categoryID);
  return deletedCategory;
};

export default {
  getCategoryByID,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
