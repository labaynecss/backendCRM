import { Router } from "express";
import { createUser, updateUsers, usersList, userbyId } from "../controllers/userControlllers";
import { createuserValidation, validate } from "../validations/userValidation";
    



const router = Router();
router.post("/register", createuserValidation,validate, createUser)
router.get("/users", usersList)
router.put("/user/:id", updateUsers)
router.get("/user/:id", userbyId)




export const userRoutes = router