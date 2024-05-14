import { Router } from "express";
import { login, refreshToken, register , user } from "../controllers/credentialController";
import { verifyToken } from "../middlewares/credMiddleware";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get("/user", verifyToken, user);
router.get("/refresh", refreshToken)

export const credentialRoutes = router
