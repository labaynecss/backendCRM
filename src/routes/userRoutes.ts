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
router.get("/users", Authorization.authorized,UserController.usersList);
router.put("/user/:emp_id" ,UserController.updateUsers);
router.get("/user/:emp_id", Authorization.authorized,UserController.userbyId);

export const userRoutes = router;
