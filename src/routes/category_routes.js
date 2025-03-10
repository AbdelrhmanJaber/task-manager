import { Router } from "express";
import verifyToken from "../middleware/verify_token.js";
import isAuthorized from "../middleware/is_authorized.js";
import userRoles from "../utils/user_roles.js";
import categoryControllers from "../controllers/category_controllers.js";
import categoryValidationSchemaFunc from "../middleware/category_validation_schema.js";

const {
  getCategoryByID,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = categoryControllers;

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    categoryValidationSchemaFunc(),
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    createCategory
  );

router
  .route("/:categoryID")
  .get(getCategoryByID)
  .patch(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    updateCategory
  )
  .delete(
    verifyToken,
    isAuthorized(userRoles.ADMIN, userRoles.MANAGER),
    deleteCategory
  );

export default router;
