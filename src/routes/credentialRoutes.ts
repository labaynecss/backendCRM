import { Router } from "express";
import { login, register , user } from "../controllers/credentialController";
import { verifyToken } from "../middlewares/credMiddleware";



const router = Router();


router.get("/register", register)
router.post("/login", login)
router.get("/user", verifyToken, user);

export const credentialRoutes = router
