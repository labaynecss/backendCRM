import { Router } from "express";
import UserController from "../controllers/userControlllers";
import { createuserValidation, validate } from "../validations/userValidation";
import Authorization from "../services/Authorization";

const router = Router();
router.post(
  "/register",
  createuserValidation,
  validate,
  UserController.createUser
);
router.get("/users", Authorization.authorized, UserController.usersList);
router.put("/user/:emp_id", UserController.updateUsers);
router.get("/user/:emp_id", Authorization.authorized, UserController.userbyId);
router.get(
  "/default_roles",
  Authorization.authorized,
  UserController.DefaultRoles
);
router.put(
  "/default_roles/updated",
  Authorization.authorized,
  UserController.UpdateDefaultRoles
);
router.get(
  "/default_roles/department",
  Authorization.authorized,
  UserController.UserDepartment
);
router.get(
  "/default_roles/:emp_id",
  Authorization.authorized,
  UserController.UserAccessEmpID
);
router.put(
  "/default_roles/:emp_id",
  Authorization.authorized,
  UserController.UserAccessUpdateEmpID
);
router.get(
  "/users/name/:fullname",
  Authorization.authorized,
  UserController.UserSearch
);

export const userRoutes = router;
