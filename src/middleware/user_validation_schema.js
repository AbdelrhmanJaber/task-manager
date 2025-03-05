import { body } from "express-validator";
import userRoles from "../utils/user_roles";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@&*])[A-Za-z\d@&*]{8,}$/;
const allowedRoles = Object.values(userRoles);

const nameValidation = (field) => {
  body(field)
    .notEmpty()
    .withMessage(`${field} is required`)
    .matches(/^[A-Za-z\s]+$/)
    .withMessage(`${field} must contain only letters and spaces`);
};

const userValidationSchemaFunc = () => {
  return [
    nameValidation("firstName"),
    nameValidation("lastName"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("It must be a valid email\nex:john123@gmail.com"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(passwordRegex)
      .withMessage(
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character (@, &, *)"
      ),
    body("role")
      .optional()
      .isIn(allowedRoles)
      .withMessage(`Invalid role. Must be one of: ${allowedRoles.join(", ")}`),
  ];
};

export default userValidationSchemaFunc;
