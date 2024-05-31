import { Router } from "express";
import UserController from "../controllers/userControlllers";
import { createuserValidation, validate } from "../validations/userValidation";



const router = Router();
router.post("/register", createuserValidation,validate, UserController.createUser)
router.get("/users", UserController.usersList)
router.put("/user/:id", UserController.updateUsers)
router.get("/user/:id", UserController.userbyId)




export const userRoutes = router