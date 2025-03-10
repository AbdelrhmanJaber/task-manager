import { body } from "express-validator";
import { categoryTypes } from "../utils/category_types.js";
import mongoose from "mongoose";

const allowedCategory = Object.values(categoryTypes);
const nameSchema = /^[A-Za-z\s]+$/;

const categoryValidationSchemaFunc = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("category name is required")
      .matches(nameSchema)
      .withMessage("Category name must contain only letters and spaces")
      .isIn(allowedCategory)
      .withMessage(
        `Invalid category. Must be one of: ${allowedCategory.join(", ")}`
      ),
    body("description").notEmpty().withMessage("description is required"),
  ];
};

export default categoryValidationSchemaFunc;
