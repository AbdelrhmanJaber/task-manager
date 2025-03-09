import { body } from "express-validator";
import Category from "../models/category.js";

const nameSchema = /^[A-Za-z\s]+$/;

const categoryValidationSchemaFunc = () => {
  return [
    body("name")
      .isEmpty()
      .withMessage("category name is required")
      .matches(nameSchema)
      .withMessage("Category name must contain only letters and spaces"),
    body("description").isEmpty().withMessage("description is required"),
  ];
};

export default categoryValidationSchemaFunc;
