import { body } from "express-validator";
const taskValidationSchemaFunc = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title at least is 2 digits"),
  ];
};

export default taskValidationSchemaFunc;
