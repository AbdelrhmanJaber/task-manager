import { body } from "express-validator";
import userRoles from "../utils/user_roles.js";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@&*])[A-Za-z\d@&*]{8,}$/;
const nameSchema = /^[A-Za-z\s]+$/;
const allowedRoles = Object.values(userRoles);

const nameValidation = (field, isOptional) => {
  let validator = body(field);
  if (isOptional) validator = validator.optional();
  return validator
    .matches(nameSchema)
    .withMessage(`${field} must contain only letters and spaces`);
};

const emailValidation = (isOptional) => {
  let validator = body("email");
  if (isOptional) validator = validator.optional();
  return validator
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("It must be a valid email, ex:john123@gmail.com");
};

const passwordValidation = (isOptional) => {
  let validator = body("password");
  if (isOptional) validator = validator.optional();
  return validator
    .notEmpty()
    .withMessage("Password is required")
    .matches(passwordRegex)
    .withMessage(
      "Password must be at least 8 characters long, contain at least one letter, one number, and one special character (@, &, *)"
    );
};

const roleValidator = (isOptional) => {
  let validator = body("role");
  if (isOptional) validator = validator.optional();
  return validator
    .isIn(allowedRoles)
    .withMessage(`Invalid role. Must be one of: ${allowedRoles.join(", ")}`);
};

const userCreateValidation = () => {
  return [
    nameValidation("firstName", false),
    nameValidation("lastName", false),
    emailValidation(false),
    passwordValidation(false),
    roleValidator(true),
  ];
};

const userUpdateValidation = () => {
  return [
    nameValidation("firstName", true),
    nameValidation("lastName", true),
    emailValidation(true),
    passwordValidation(true),
    roleValidator(true),
  ];
};

export { userCreateValidation, userUpdateValidation };
